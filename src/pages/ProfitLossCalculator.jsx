import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CheckCircle, Info, RotateCcw, BarChart3, FileDown } from 'lucide-react'
import { printDocument } from '../utils/printExport'

const fmt = (n) => {
  if (isNaN(n) || !isFinite(n)) return '0.00'
  return Number(Math.abs(n)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
const pct = (n, d) => (d === 0 ? 0 : (n / d) * 100)
const fmtPct = (n) => (isNaN(n) || !isFinite(n) ? '0.0' : Number(n).toFixed(1))

const KPI = ({ label, value, suffix = '%', benchmark, low, color }) => {
  const v = parseFloat(value) || 0
  let status = 'neutral'
  if (benchmark !== undefined) {
    if (low) status = v <= benchmark.good ? 'good' : v <= benchmark.ok ? 'warn' : 'bad'
    else status = v >= benchmark.good ? 'good' : v >= benchmark.ok ? 'warn' : 'bad'
  }
  const colors = { good: 'text-green-600 bg-green-50 border-green-200', warn: 'text-yellow-600 bg-yellow-50 border-yellow-200', bad: 'text-red-600 bg-red-50 border-red-200', neutral: 'text-gray-900 bg-white border-gray-200' }
  const icons = { good: <CheckCircle size={16} className="text-green-500" />, warn: <AlertCircle size={16} className="text-yellow-500" />, bad: <AlertCircle size={16} className="text-red-500" />, neutral: null }
  return (
    <div className={`rounded-xl border-2 p-5 ${colors[status]}`}>
      <div className="flex items-start justify-between mb-1">
        <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</span>
        {icons[status]}
      </div>
      <p className="text-3xl font-extrabold">{value}{suffix}</p>
      {benchmark && (
        <p className="text-xs mt-1 opacity-70">
          Ideal: {low ? `< ${benchmark.good}` : `> ${benchmark.good}`}{suffix}
        </p>
      )}
    </div>
  )
}

const Row = ({ label, value, onChange, indent = false, note }) => (
  <div className={`flex items-center gap-4 py-3 border-b border-gray-100 ${indent ? 'pl-4' : ''}`}>
    <div className="flex-1">
      <span className={`${indent ? 'text-sm text-gray-600' : 'font-semibold text-gray-800'}`}>{label}</span>
      {note && <p className="text-xs text-gray-400 mt-0.5">{note}</p>}
    </div>
    <div className="flex items-center gap-2 w-44">
      <span className="text-gray-400 text-sm">฿</span>
      <input
        type="number"
        min="0"
        step="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-right font-semibold focus:border-primary focus:outline-none"
      />
    </div>
  </div>
)

const ProfitLossCalculator = () => {
  const [period, setPeriod] = useState('monthly')

  const [rev, setRev] = useState({ food: '', beverage: '', delivery: '', other: '' })
  const [cogs, setCogs] = useState({ food: '', beverage: '', packaging: '' })
  const [labor, setLabor] = useState({ foh: '', boh: '', management: '' })
  const [expenses, setExpenses] = useState({
    rent: '', utilities: '', marketing: '', supplies: '', software: '', insurance: '', depreciation: '', misc: ''
  })

  const setR = (k) => (v) => setRev((p) => ({ ...p, [k]: v }))
  const setC = (k) => (v) => setCogs((p) => ({ ...p, [k]: v }))
  const setL = (k) => (v) => setLabor((p) => ({ ...p, [k]: v }))
  const setE = (k) => (v) => setExpenses((p) => ({ ...p, [k]: v }))

  const reset = () => {
    setRev({ food: '', beverage: '', delivery: '', other: '' })
    setCogs({ food: '', beverage: '', packaging: '' })
    setLabor({ foh: '', boh: '', management: '' })
    setExpenses({ rent: '', utilities: '', marketing: '', supplies: '', software: '', insurance: '', depreciation: '', misc: '' })
  }

  const n = (v) => parseFloat(v) || 0

  const c = useMemo(() => {
    const totalRev = n(rev.food) + n(rev.beverage) + n(rev.delivery) + n(rev.other)
    const totalCogs = n(cogs.food) + n(cogs.beverage) + n(cogs.packaging)
    const totalLabor = n(labor.foh) + n(labor.boh) + n(labor.management)
    const totalExp = Object.values(expenses).reduce((s, v) => s + n(v), 0)
    const grossProfit = totalRev - totalCogs
    const primeCost = totalCogs + totalLabor
    const operatingProfit = grossProfit - totalLabor - totalExp
    const netProfit = operatingProfit
    const breakEven = totalRev > 0 ? (totalLabor + totalExp) / (1 - totalCogs / (totalRev || 1)) : 0

    const foodCostPct = pct(n(cogs.food), n(rev.food) || totalRev)
    const bevCostPct = pct(n(cogs.beverage), n(rev.beverage) || totalRev)
    const cogsVsRevPct = pct(totalCogs, totalRev)
    const grossProfitPct = pct(grossProfit, totalRev)
    const laborPct = pct(totalLabor, totalRev)
    const primeCostPct = pct(primeCost, totalRev)
    const opExpPct = pct(totalExp, totalRev)
    const netProfitPct = pct(netProfit, totalRev)

    const multiplier = period === 'daily' ? 30 : period === 'weekly' ? 4.33 : period === 'annual' ? 1 / 12 : 1

    return {
      totalRev, totalCogs, totalLabor, totalExp,
      grossProfit, primeCost, operatingProfit, netProfit, breakEven,
      foodCostPct, bevCostPct, cogsVsRevPct, grossProfitPct,
      laborPct, primeCostPct, opExpPct, netProfitPct,
      projAnnualRev: totalRev * 12,
      projAnnualProfit: netProfit * 12,
    }
  }, [rev, cogs, labor, expenses, period])

  const benchmarks = [
    { label: 'Food Cost %', actual: c.foodCostPct, ideal: '28–32%', max: '35%', good: 32, ok: 35, low: true },
    { label: 'Beverage Cost %', actual: c.bevCostPct, ideal: '20–25%', max: '30%', good: 25, ok: 30, low: true },
    { label: 'Total COGS %', actual: c.cogsVsRevPct, ideal: '28–35%', max: '40%', good: 35, ok: 40, low: true },
    { label: 'Labor Cost %', actual: c.laborPct, ideal: '25–35%', max: '40%', good: 35, ok: 40, low: true },
    { label: 'Prime Cost %', actual: c.primeCostPct, ideal: '55–65%', max: '70%', good: 65, ok: 70, low: true },
    { label: 'Gross Profit %', actual: c.grossProfitPct, ideal: '> 65%', max: '> 60%', good: 65, ok: 60, low: false },
    { label: 'Net Profit %', actual: c.netProfitPct, ideal: '10–15%', max: '> 5%', good: 10, ok: 5, low: false },
  ]

  const statusColor = (actual, good, ok, low) => {
    if (low) return actual <= good ? 'bg-green-500' : actual <= ok ? 'bg-yellow-500' : 'bg-red-500'
    return actual >= good ? 'bg-green-500' : actual >= ok ? 'bg-yellow-500' : 'bg-red-500'
  }

  const kpiStatus = (actual, good, ok, low) => {
    if (low) return actual <= good ? 'good' : actual <= ok ? 'warn' : 'bad'
    return actual >= good ? 'good' : actual >= ok ? 'warn' : 'bad'
  }

  const handleExport = () => {
    printDocument({
      title: `Profit & Loss Report`,
      subtitle: `${period.charAt(0).toUpperCase() + period.slice(1)} P&L Analysis — Restaurant / F&B Business`,
      filename: 'profit-loss-report',
      sections: [
        {
          type: 'pl',
          title: `P&L Statement (${period.charAt(0).toUpperCase() + period.slice(1)})`,
          rows: [
            { label: 'Food Sales', value: `฿${fmt(n(rev.food))}`, pct: c.totalRev > 0 ? `${fmtPct(pct(n(rev.food), c.totalRev))}%` : '' },
            { label: 'Beverage Sales', value: `฿${fmt(n(rev.beverage))}`, pct: c.totalRev > 0 ? `${fmtPct(pct(n(rev.beverage), c.totalRev))}%` : '' },
            { label: 'Delivery / Online', value: `฿${fmt(n(rev.delivery))}`, indent: true },
            { label: 'Other Income', value: `฿${fmt(n(rev.other))}`, indent: true },
            { label: 'TOTAL REVENUE', value: `฿${fmt(c.totalRev)}`, bold: true, border: true, positive: true },
            { label: 'Food Cost', value: `(฿${fmt(n(cogs.food))})`, negative: true, pct: c.totalRev > 0 ? `${fmtPct(pct(n(cogs.food), c.totalRev))}%` : '', indent: true },
            { label: 'Beverage Cost', value: `(฿${fmt(n(cogs.beverage))})`, negative: true, indent: true },
            { label: 'Packaging', value: `(฿${fmt(n(cogs.packaging))})`, negative: true, indent: true },
            { label: 'GROSS PROFIT', value: `฿${fmt(c.grossProfit)}`, bold: true, border: true, positive: c.grossProfit >= 0, negative: c.grossProfit < 0, pct: c.totalRev > 0 ? `${fmtPct(c.grossProfitPct)}%` : '' },
            { label: 'FOH Labour', value: `(฿${fmt(n(labor.foh))})`, negative: true, indent: true },
            { label: 'BOH Labour', value: `(฿${fmt(n(labor.boh))})`, negative: true, indent: true },
            { label: 'Management', value: `(฿${fmt(n(labor.management))})`, negative: true, indent: true },
            { label: 'Total Labour', value: `(฿${fmt(c.totalLabor)})`, negative: true, pct: c.totalRev > 0 ? `${fmtPct(c.laborPct)}%` : '' },
            { label: 'PRIME COST (COGS + Labour)', value: `(฿${fmt(c.primeCost)})`, bold: true, negative: true, pct: c.totalRev > 0 ? `${fmtPct(c.primeCostPct)}%` : '' },
            { label: 'Total Operating Expenses', value: `(฿${fmt(c.totalExp)})`, negative: true, border: true, pct: c.totalRev > 0 ? `${fmtPct(c.opExpPct)}%` : '' },
            { label: 'NET PROFIT / (LOSS)', value: c.netProfit >= 0 ? `฿${fmt(c.netProfit)}` : `(฿${fmt(Math.abs(c.netProfit))})`, bold: true, border: true, positive: c.netProfit >= 0, negative: c.netProfit < 0, pct: c.totalRev > 0 ? `${fmtPct(c.netProfitPct)}%` : '' },
          ]
        },
        {
          type: 'kpi',
          title: 'Key Performance Indicators',
          items: [
            { label: 'Gross Profit %', value: `${fmtPct(c.grossProfitPct)}%`, status: kpiStatus(c.grossProfitPct, 65, 60, false), note: 'Target > 65%' },
            { label: 'Prime Cost %', value: `${fmtPct(c.primeCostPct)}%`, status: kpiStatus(c.primeCostPct, 65, 70, true), note: 'Target < 65%' },
            { label: 'Labour Cost %', value: `${fmtPct(c.laborPct)}%`, status: kpiStatus(c.laborPct, 35, 40, true), note: 'Target < 35%' },
            { label: 'Net Profit %', value: `${fmtPct(c.netProfitPct)}%`, status: kpiStatus(c.netProfitPct, 10, 5, false), note: 'Target > 10%' },
            { label: 'Break-Even Revenue', value: `฿${fmt(c.breakEven)}`, note: `Per ${period}` },
            { label: 'Projected Annual Profit', value: c.netProfit >= 0 ? `฿${fmt(c.projAnnualProfit)}` : `(฿${fmt(Math.abs(c.projAnnualProfit))})`, status: c.netProfit >= 0 ? 'good' : 'bad' },
          ]
        },
        {
          type: 'table',
          title: 'Benchmark Comparison',
          headers: ['Metric', 'Your Result', 'Ideal Range', 'Status'],
          rows: [
            [{ value: 'Food Cost %' }, { value: `${fmtPct(c.foodCostPct)}%` }, { value: '28–32%' }, { value: c.foodCostPct <= 32 ? '✓ Good' : c.foodCostPct <= 35 ? '⚠ Watch' : '✗ High', cls: c.foodCostPct <= 32 ? 'good' : c.foodCostPct <= 35 ? 'warn' : 'bad' }],
            [{ value: 'Labour Cost %' }, { value: `${fmtPct(c.laborPct)}%` }, { value: '25–35%' }, { value: c.laborPct <= 35 ? '✓ Good' : c.laborPct <= 40 ? '⚠ Watch' : '✗ High', cls: c.laborPct <= 35 ? 'good' : c.laborPct <= 40 ? 'warn' : 'bad' }],
            [{ value: 'Prime Cost %' }, { value: `${fmtPct(c.primeCostPct)}%` }, { value: '55–65%' }, { value: c.primeCostPct <= 65 ? '✓ Good' : c.primeCostPct <= 70 ? '⚠ Watch' : '✗ High', cls: c.primeCostPct <= 65 ? 'good' : c.primeCostPct <= 70 ? 'warn' : 'bad' }],
            [{ value: 'Gross Profit %' }, { value: `${fmtPct(c.grossProfitPct)}%` }, { value: '> 65%' }, { value: c.grossProfitPct >= 65 ? '✓ Good' : c.grossProfitPct >= 60 ? '⚠ Watch' : '✗ Low', cls: c.grossProfitPct >= 65 ? 'good' : c.grossProfitPct >= 60 ? 'warn' : 'bad' }],
            [{ value: 'Net Profit %' }, { value: `${fmtPct(c.netProfitPct)}%` }, { value: '10–15%' }, { value: c.netProfitPct >= 10 ? '✓ Good' : c.netProfitPct >= 5 ? '⚠ Watch' : '✗ Low', cls: c.netProfitPct >= 10 ? 'good' : c.netProfitPct >= 5 ? 'warn' : 'bad' }],
          ]
        },
        {
          type: 'table',
          title: 'What-If Improvement Scenarios',
          headers: ['Scenario', 'Extra Profit / Month', 'Extra Profit / Year'],
          rows: [
            [{ value: 'Reduce food cost by 2%' }, { value: `+฿${fmt(c.totalRev * 0.02)}` }, { value: `+฿${fmt(c.totalRev * 0.02 * 12)}` }],
            [{ value: 'Reduce labour cost by 2%' }, { value: `+฿${fmt(c.totalRev * 0.02)}` }, { value: `+฿${fmt(c.totalRev * 0.02 * 12)}` }],
            [{ value: 'Increase revenue by 10%' }, { value: `+฿${fmt(c.totalRev * 0.10 * (c.grossProfitPct / 100))}` }, { value: `+฿${fmt(c.totalRev * 0.10 * (c.grossProfitPct / 100) * 12)}` }],
            [{ value: 'Reduce waste by 5%' }, { value: `+฿${fmt(c.totalCogs * 0.05)}` }, { value: `+฿${fmt(c.totalCogs * 0.05 * 12)}` }],
            [{ value: 'Cut overhead by ฿5,000/mo' }, { value: `+฿${fmt(5000)}` }, { value: `+฿${fmt(60000)}` }],
          ]
        }
      ]
    })
  }

  return (
    <div>
      <Helmet>
        <title>Profit & Loss Calculator - CloudNet Softwares Resources</title>
        <meta name="description" content="Free restaurant profit and loss calculator. Analyse revenue, food cost, labour, prime cost, operating expenses, and net profit margin with industry benchmark comparison." />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/resources/profit-loss-calculator" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <BarChart3 size={16} /> Resources / Calculators
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Profit & Loss <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Enter your revenue, food cost, labour, and overheads to get a full P&L breakdown — prime cost,
            gross margin, net profit, break-even, and how you compare against industry benchmarks.
          </p>
          <button onClick={handleExport}
            className="inline-flex items-center gap-2 bg-primary hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            <FileDown size={20} /> Export PDF Report
          </button>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Period + Reset */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">Reporting Period:</span>
              {['daily', 'weekly', 'monthly', 'annual'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize text-sm transition-all ${period === p ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {p}
                </button>
              ))}
            </div>
            <button onClick={reset} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
              <RotateCcw size={14} /> Reset All
            </button>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">

            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">

              {/* Revenue */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp size={18} className="text-green-500" /> Revenue
                </h2>
                <p className="text-xs text-gray-400 mb-4">Enter your {period} revenue by channel</p>
                <Row label="Food Sales" value={rev.food} onChange={setR('food')} />
                <Row label="Beverage Sales" value={rev.beverage} onChange={setR('beverage')} />
                <Row label="Delivery / Online Orders" value={rev.delivery} onChange={setR('delivery')} />
                <Row label="Other Income" value={rev.other} onChange={setR('other')} note="Events, catering, merchandise" />
              </div>

              {/* COGS */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <DollarSign size={18} className="text-orange-500" /> Cost of Goods Sold (COGS)
                </h2>
                <p className="text-xs text-gray-400 mb-4">Ingredient & product costs for the period</p>
                <Row label="Food Cost" value={cogs.food} onChange={setC('food')} />
                <Row label="Beverage Cost" value={cogs.beverage} onChange={setC('beverage')} />
                <Row label="Packaging / Containers" value={cogs.packaging} onChange={setC('packaging')} />
              </div>

              {/* Labor */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <DollarSign size={18} className="text-blue-500" /> Labour Costs
                </h2>
                <p className="text-xs text-gray-400 mb-4">Wages, salaries, and benefits</p>
                <Row label="Front of House (FOH)" value={labor.foh} onChange={setL('foh')} note="Servers, hosts, cashiers" />
                <Row label="Back of House (BOH)" value={labor.boh} onChange={setL('boh')} note="Chefs, kitchen staff, cleaners" />
                <Row label="Management / Admin" value={labor.management} onChange={setL('management')} />
              </div>

              {/* Expenses */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <DollarSign size={18} className="text-purple-500" /> Operating Expenses
                </h2>
                <p className="text-xs text-gray-400 mb-4">Fixed and variable overhead costs</p>
                <Row label="Rent / Lease" value={expenses.rent} onChange={setE('rent')} />
                <Row label="Utilities" value={expenses.utilities} onChange={setE('utilities')} note="Water, electricity, gas, internet" />
                <Row label="Marketing & Advertising" value={expenses.marketing} onChange={setE('marketing')} />
                <Row label="Supplies & Smallwares" value={expenses.supplies} onChange={setE('supplies')} />
                <Row label="POS / Software / Subscriptions" value={expenses.software} onChange={setE('software')} />
                <Row label="Insurance" value={expenses.insurance} onChange={setE('insurance')} />
                <Row label="Depreciation / Equipment" value={expenses.depreciation} onChange={setE('depreciation')} />
                <Row label="Miscellaneous" value={expenses.misc} onChange={setE('misc')} />
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3 space-y-6">

              {/* P&L Summary */}
              <div className="bg-gray-900 text-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><BarChart3 size={20} className="text-orange-400" /> P&L Summary — {period.charAt(0).toUpperCase() + period.slice(1)}</h2>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Total Revenue', value: c.totalRev, highlight: true, color: 'text-green-400' },
                    { label: 'Cost of Goods Sold (COGS)', value: -c.totalCogs, color: 'text-red-300' },
                    { label: 'Gross Profit', value: c.grossProfit, bold: true, color: c.grossProfit >= 0 ? 'text-green-400' : 'text-red-400', border: true },
                    { label: 'Labour Costs', value: -c.totalLabor, color: 'text-red-300' },
                    { label: '— Prime Cost (COGS + Labour)', value: -c.primeCost, color: 'text-orange-300', indent: true },
                    { label: 'Operating Expenses', value: -c.totalExp, color: 'text-red-300', border: true },
                    { label: 'Net Profit / (Loss)', value: c.netProfit, bold: true, large: true, color: c.netProfit >= 0 ? 'text-green-400' : 'text-red-400', border: true },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-2 ${row.border ? 'border-t border-gray-700 mt-2 pt-3' : ''} ${row.indent ? 'pl-4 opacity-80' : ''}`}>
                      <span className={`${row.bold ? 'font-bold' : ''} ${row.highlight ? 'text-white' : 'text-gray-300'}`}>{row.label}</span>
                      <span className={`${row.large ? 'text-2xl font-extrabold' : 'font-semibold'} ${row.color}`}>
                        {row.value < 0 ? `(฿${fmt(row.value)})` : `฿${fmt(row.value)}`}
                        {c.totalRev > 0 && <span className="text-xs opacity-60 ml-2">{fmtPct(pct(Math.abs(row.value), c.totalRev))}%</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <KPI label="Gross Profit %" value={fmtPct(c.grossProfitPct)} benchmark={{ good: 65, ok: 60 }} low={false} />
                <KPI label="Prime Cost %" value={fmtPct(c.primeCostPct)} benchmark={{ good: 65, ok: 70 }} low={true} />
                <KPI label="Labour Cost %" value={fmtPct(c.laborPct)} benchmark={{ good: 35, ok: 40 }} low={true} />
                <KPI label="Net Profit %" value={fmtPct(c.netProfitPct)} benchmark={{ good: 10, ok: 5 }} low={false} />
                <KPI label="Break-Even Revenue" value={`฿${fmt(c.breakEven)}`} suffix="" />
                <KPI label="Projected Annual Profit" value={c.netProfit >= 0 ? `฿${fmt(c.projAnnualProfit)}` : `(฿${fmt(c.projAnnualProfit)})`} suffix="" />
              </div>

              {/* Benchmark Comparison */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Info size={18} className="text-primary" /> Industry Benchmark Comparison</h2>
                <div className="space-y-4">
                  {benchmarks.map((b) => {
                    const barWidth = Math.min(100, Math.max(0, b.actual))
                    const sc = statusColor(b.actual, b.good, b.ok, b.low)
                    return (
                      <div key={b.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-semibold text-gray-700">{b.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-xs">Ideal: <span className="text-green-600 font-semibold">{b.ideal}</span></span>
                            <span className={`font-bold ${sc.includes('green') ? 'text-green-600' : sc.includes('yellow') ? 'text-yellow-600' : 'text-red-600'}`}>
                              {fmtPct(b.actual)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 relative">
                          <div className={`h-2.5 rounded-full transition-all duration-500 ${sc}`}
                            style={{ width: `${barWidth}%` }} />
                          <div className="absolute top-0 h-full border-l-2 border-dashed border-gray-400" style={{ left: `${b.good}%` }} />
                        </div>
                      </div>
                    )
                  })}
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Info size={11} /> Dashed line = ideal benchmark. Green ✓ = on target, Yellow = watch, Red = action needed.</p>
                </div>
              </div>

              {/* What-If Analysis */}
              {c.totalRev > 0 && (
                <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-primary" /> What-If Analysis</h2>
                  <p className="text-sm text-gray-600 mb-4">See how small improvements affect your bottom line:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-200">
                          <th className="text-left pb-2 text-gray-600 font-semibold">Scenario</th>
                          <th className="text-right pb-2 text-gray-600 font-semibold">Extra Profit / Month</th>
                          <th className="text-right pb-2 text-gray-600 font-semibold">Extra Profit / Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-50">
                        {[
                          { label: 'Reduce food cost by 2%', gain: c.totalRev * 0.02 },
                          { label: 'Reduce labour cost by 2%', gain: c.totalRev * 0.02 },
                          { label: 'Increase revenue by 10%', gain: c.totalRev * 0.10 * (c.grossProfitPct / 100) },
                          { label: 'Reduce waste by 5%', gain: c.totalCogs * 0.05 },
                          { label: 'Cut overhead by ฿5,000/mo', gain: 5000 },
                        ].map((s) => (
                          <tr key={s.label}>
                            <td className="py-2 text-gray-700">{s.label}</td>
                            <td className="py-2 text-right font-semibold text-green-600">+฿{fmt(s.gain)}</td>
                            <td className="py-2 text-right font-semibold text-green-700">+฿{fmt(s.gain * 12)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Action Tips based on results */}
              {c.totalRev > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Action Recommendations</h2>
                  <div className="space-y-3">
                    {c.foodCostPct > 35 && (
                      <div className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700"><span className="font-bold">High Food Cost ({fmtPct(c.foodCostPct)}%):</span> Review supplier pricing, standardize recipes, reduce waste, and re-engineer your menu to feature higher-margin dishes.</p>
                      </div>
                    )}
                    {c.laborPct > 40 && (
                      <div className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700"><span className="font-bold">High Labour Cost ({fmtPct(c.laborPct)}%):</span> Optimise shift scheduling with POS sales data, cross-train staff, and review overtime patterns.</p>
                      </div>
                    )}
                    {c.primeCostPct > 70 && (
                      <div className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700"><span className="font-bold">Prime Cost Danger Zone ({fmtPct(c.primeCostPct)}%):</span> Industry best practice is under 65%. Both food cost and labour must be addressed simultaneously.</p>
                      </div>
                    )}
                    {c.netProfitPct < 5 && c.totalRev > 0 && (
                      <div className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-700"><span className="font-bold">Low Net Margin ({fmtPct(c.netProfitPct)}%):</span> Consider a combination of small price increases, portion reviews, and overhead reduction to push margin above 10%.</p>
                      </div>
                    )}
                    {c.netProfit >= 0 && c.netProfitPct >= 10 && c.primeCostPct <= 65 && (
                      <div className="flex gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-700"><span className="font-bold">Great Performance!</span> Your prime cost and net margin are within healthy industry ranges. Focus on growing revenue and maintaining consistency.</p>
                      </div>
                    )}
                    {c.totalRev === 0 && (
                      <p className="text-gray-400 text-sm">Enter your revenue and cost figures above to receive personalised action recommendations.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfitLossCalculator
