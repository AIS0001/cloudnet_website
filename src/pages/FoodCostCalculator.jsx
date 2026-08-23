import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Trash2, ChefHat, TrendingUp, DollarSign, Target, Info, RotateCcw, FileDown } from 'lucide-react'
import { printDocument } from '../utils/printExport'

const UNITS = ['kg', 'g', 'liter', 'ml', 'piece', 'dozen', 'cup', 'tbsp', 'tsp', 'lb', 'oz', 'portion']

const defaultIngredient = () => ({ id: Date.now() + Math.random(), name: '', qty: '', unit: 'kg', costPerUnit: '' })

const pctColor = (pct) => {
  if (pct <= 30) return 'text-green-600'
  if (pct <= 35) return 'text-yellow-600'
  return 'text-red-600'
}
const pctBg = (pct) => {
  if (pct <= 30) return 'bg-green-50 border-green-300'
  if (pct <= 35) return 'bg-yellow-50 border-yellow-300'
  return 'bg-red-50 border-red-300'
}
const pctLabel = (pct) => {
  if (pct <= 30) return 'Excellent'
  if (pct <= 35) return 'Acceptable'
  return 'Too High'
}

const fmt = (n) => (isNaN(n) || !isFinite(n) ? '0.00' : Number(n).toFixed(2))

const FoodCostCalculator = () => {
  const [dishName, setDishName] = useState('')
  const [ingredients, setIngredients] = useState([defaultIngredient()])
  const [servings, setServings] = useState(1)
  const [targetPct, setTargetPct] = useState(30)
  const [actualMenuPrice, setActualMenuPrice] = useState('')
  const [wastePct, setWastePct] = useState(10)
  const [vatPct, setVatPct] = useState(7)

  const addRow = () => setIngredients((prev) => [...prev, defaultIngredient()])
  const removeRow = (id) => setIngredients((prev) => prev.filter((r) => r.id !== id))
  const updateRow = (id, field, value) =>
    setIngredients((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))

  const reset = () => {
    setDishName('')
    setIngredients([defaultIngredient()])
    setServings(1)
    setTargetPct(30)
    setActualMenuPrice('')
    setWastePct(10)
    setVatPct(7)
  }

  const calc = useMemo(() => {
    const totalIngredientCost = ingredients.reduce((sum, r) => {
      const v = parseFloat(r.qty) * parseFloat(r.costPerUnit)
      return sum + (isNaN(v) ? 0 : v)
    }, 0)
    const wasteAdjusted = totalIngredientCost * (1 + wastePct / 100)
    const servingsN = Math.max(1, parseFloat(servings) || 1)
    const costPerServing = wasteAdjusted / servingsN
    const suggestedPrice = costPerServing / (targetPct / 100)
    const suggestedPriceWithVat = suggestedPrice * (1 + vatPct / 100)
    const actualPrice = parseFloat(actualMenuPrice) || 0
    const actualPriceExVat = actualPrice / (1 + vatPct / 100)
    const actualFoodCostPct = actualPriceExVat > 0 ? (costPerServing / actualPriceExVat) * 100 : 0
    const profitPerServing = actualPriceExVat - costPerServing
    const profitMarginPct = actualPriceExVat > 0 ? (profitPerServing / actualPriceExVat) * 100 : 0
    return {
      totalIngredientCost,
      wasteAdjusted,
      costPerServing,
      suggestedPrice,
      suggestedPriceWithVat,
      actualFoodCostPct,
      profitPerServing,
      profitMarginPct
    }
  }, [ingredients, servings, targetPct, actualMenuPrice, wastePct, vatPct])

  const handleExport = () => {
    const status = (p) => p <= 30 ? 'good' : p <= 35 ? 'warn' : 'bad'
    printDocument({
      title: `Food Cost Report${dishName ? ` — ${dishName}` : ''}`,
      subtitle: `Recipe Costing & Menu Pricing Analysis`,
      filename: 'food-cost-report',
      sections: [
        {
          type: 'table',
          title: 'Recipe Details',
          headers: ['Parameter', 'Value'],
          rows: [
            ['Dish / Recipe Name', { value: dishName || '—', cls: '' }],
            ['Number of Servings', { value: servings, cls: '' }],
            ['Waste / Trim Factor', { value: `${wastePct}%`, cls: '' }],
            ['VAT / GST Rate', { value: `${vatPct}%`, cls: '' }],
            ['Target Food Cost %', { value: `${targetPct}%`, cls: '' }],
            ['Actual Menu Price (incl. VAT)', { value: actualMenuPrice ? `฿${actualMenuPrice}` : '—', cls: '' }],
          ]
        },
        {
          type: 'table',
          title: 'Ingredient Breakdown',
          headers: ['Ingredient', 'Qty', 'Unit', 'Cost / Unit (฿)', 'Total (฿)'],
          rows: ingredients.filter(r => r.name || r.qty).map(r => {
            const t = parseFloat(r.qty) * parseFloat(r.costPerUnit)
            return [
              { value: r.name || '—' },
              { value: r.qty || '0' },
              { value: r.unit },
              { value: `฿${fmt(parseFloat(r.costPerUnit) || 0)}` },
              { value: isNaN(t) ? '—' : `฿${fmt(t)}` }
            ]
          })
        },
        {
          type: 'kpi',
          title: 'Cost & Pricing Summary',
          items: [
            { label: 'Total Ingredient Cost', value: `฿${fmt(calc.totalIngredientCost)}` },
            { label: `After Waste (${wastePct}%)`, value: `฿${fmt(calc.wasteAdjusted)}` },
            { label: 'Cost per Serving', value: `฿${fmt(calc.costPerServing)}` },
            { label: 'Suggested Price (ex. VAT)', value: `฿${fmt(calc.suggestedPrice)}` },
            { label: `Suggested Price (incl. ${vatPct}% VAT)`, value: `฿${fmt(calc.suggestedPriceWithVat)}` },
            ...(parseFloat(actualMenuPrice) > 0 ? [
              { label: 'Actual Food Cost %', value: `${fmt(calc.actualFoodCostPct)}%`, status: status(calc.actualFoodCostPct) },
              { label: 'Gross Profit / Serving', value: `฿${fmt(calc.profitPerServing)}`, status: calc.profitPerServing >= 0 ? 'good' : 'bad' },
              { label: 'Gross Margin %', value: `${fmt(calc.profitMarginPct)}%`, status: calc.profitMarginPct >= 65 ? 'good' : calc.profitMarginPct >= 60 ? 'warn' : 'bad' },
            ] : [])
          ]
        },
        {
          type: 'list',
          title: 'Industry Benchmarks Reference',
          items: [
            'Food Cost %: Ideal 28–32% | Acceptable up to 35%',
            'Gross Margin: Target > 65% | Minimum > 60%',
            'Waste Factor: Ideal 5–10% | Maximum 15%',
            'Review menu pricing monthly as ingredient costs change seasonally',
          ]
        }
      ]
    })
  }

  return (
    <div>
      <Helmet>
        <title>Food Cost Calculator - CloudNet Softwares Resources</title>
        <meta name="description" content="Free food cost calculator for restaurants. Calculate recipe cost per serving, ideal menu price, food cost percentage, and profit per dish." />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/resources/food-cost-calculator" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <ChefHat size={16} /> Resources / Calculators
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Food Cost <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Build your recipe ingredient by ingredient, factor in waste and VAT, and instantly see your cost per
            serving, the ideal menu price, and your actual food cost percentage.
          </p>
          <button onClick={handleExport}
            className="inline-flex items-center gap-2 bg-primary hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            <FileDown size={20} /> Export PDF Report
          </button>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT — Inputs */}
            <div className="lg:col-span-2 space-y-6">

              {/* Dish Info */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><ChefHat size={20} className="text-primary" /> Recipe Details</h2>
                  <button onClick={reset} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Dish / Recipe Name</label>
                    <input value={dishName} onChange={(e) => setDishName(e.target.value)}
                      placeholder="e.g. Pad Thai" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Servings from Recipe</label>
                    <input type="number" min="1" value={servings} onChange={(e) => setServings(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Waste / Trim Factor (%) <span className="font-normal text-gray-400">— cooking loss</span>
                    </label>
                    <input type="number" min="0" max="80" value={wastePct} onChange={(e) => setWastePct(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      VAT / GST Rate (%) <span className="font-normal text-gray-400">— applied to menu price</span>
                    </label>
                    <input type="number" min="0" max="30" value={vatPct} onChange={(e) => setVatPct(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left pb-3 pr-2 font-semibold text-gray-700 min-w-[140px]">Ingredient</th>
                        <th className="text-left pb-3 pr-2 font-semibold text-gray-700 w-24">Qty</th>
                        <th className="text-left pb-3 pr-2 font-semibold text-gray-700 w-24">Unit</th>
                        <th className="text-left pb-3 pr-2 font-semibold text-gray-700 w-32">Cost / Unit (฿)</th>
                        <th className="text-right pb-3 font-semibold text-gray-700 w-28">Total (฿)</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {ingredients.map((row) => {
                        const total = parseFloat(row.qty) * parseFloat(row.costPerUnit)
                        return (
                          <tr key={row.id}>
                            <td className="py-2 pr-2">
                              <input value={row.name} onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                                placeholder="Ingredient name"
                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 focus:border-primary focus:outline-none" />
                            </td>
                            <td className="py-2 pr-2">
                              <input type="number" min="0" step="0.001" value={row.qty} onChange={(e) => updateRow(row.id, 'qty', e.target.value)}
                                placeholder="0"
                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 focus:border-primary focus:outline-none" />
                            </td>
                            <td className="py-2 pr-2">
                              <select value={row.unit} onChange={(e) => updateRow(row.id, 'unit', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 focus:border-primary focus:outline-none">
                                {UNITS.map((u) => <option key={u}>{u}</option>)}
                              </select>
                            </td>
                            <td className="py-2 pr-2">
                              <input type="number" min="0" step="0.01" value={row.costPerUnit} onChange={(e) => updateRow(row.id, 'costPerUnit', e.target.value)}
                                placeholder="0.00"
                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 focus:border-primary focus:outline-none" />
                            </td>
                            <td className="py-2 text-right font-semibold text-gray-800">
                              {isNaN(total) || total === 0 ? '—' : `฿${fmt(total)}`}
                            </td>
                            <td className="py-2 pl-2">
                              {ingredients.length > 1 && (
                                <button onClick={() => removeRow(row.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td colSpan={4} className="pt-3 font-bold text-gray-700">Total Ingredient Cost</td>
                        <td className="pt-3 text-right font-bold text-gray-900">฿{fmt(calc.totalIngredientCost)}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="pt-1 text-sm text-gray-500">After Waste/Trim Factor ({wastePct}%)</td>
                        <td className="pt-1 text-right text-sm font-semibold text-orange-600">฿{fmt(calc.wasteAdjusted)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <button onClick={addRow}
                  className="mt-4 flex items-center gap-2 text-primary hover:text-orange-700 font-semibold transition-colors">
                  <Plus size={18} /> Add Ingredient
                </button>
              </div>

              {/* Pricing Settings */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Target size={20} className="text-primary" /> Menu Pricing Settings</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Target Food Cost % — <span className="text-primary">{targetPct}%</span>
                    </label>
                    <input type="range" min="15" max="60" step="1" value={targetPct}
                      onChange={(e) => setTargetPct(Number(e.target.value))}
                      className="w-full accent-orange-600" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>15% (Aggressive)</span><span>60% (High Cost)</span>
                    </div>
                    <div className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full inline-block border ${pctBg(targetPct)} ${pctColor(targetPct)}`}>
                      Industry benchmark: 28–35% &nbsp;·&nbsp; Your target: {targetPct}% ({pctLabel(targetPct)})
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Actual Menu Price (฿ incl. VAT)</label>
                    <input type="number" min="0" step="0.5" value={actualMenuPrice} onChange={(e) => setActualMenuPrice(e.target.value)}
                      placeholder="Enter your menu price"
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" />
                    <p className="text-xs text-gray-400 mt-1">Enter the price you currently charge (or plan to charge).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Results */}
            <div className="space-y-4">
              <div className="sticky top-28 space-y-4">

                <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4">{dishName || 'Your Recipe'} — Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-orange-100 text-sm">Total Recipe Cost</span>
                      <span className="font-bold">฿{fmt(calc.wasteAdjusted)}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-orange-100 text-sm">Cost per Serving</span>
                      <span className="font-bold">฿{fmt(calc.costPerServing)}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-orange-100 text-sm">Suggested Price (ex. VAT)</span>
                      <span className="font-bold">฿{fmt(calc.suggestedPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-100 text-sm">Suggested Price (incl. {vatPct}% VAT)</span>
                      <span className="font-bold text-yellow-200 text-lg">฿{fmt(calc.suggestedPriceWithVat)}</span>
                    </div>
                  </div>
                </div>

                {parseFloat(actualMenuPrice) > 0 && (
                  <>
                    <div className={`rounded-2xl p-6 border-2 ${pctBg(calc.actualFoodCostPct)}`}>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Actual Food Cost %</p>
                      <p className={`text-4xl font-extrabold ${pctColor(calc.actualFoodCostPct)}`}>{fmt(calc.actualFoodCostPct)}%</p>
                      <p className={`text-sm font-bold mt-1 ${pctColor(calc.actualFoodCostPct)}`}>{pctLabel(calc.actualFoodCostPct)}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className={`h-2 rounded-full ${calc.actualFoodCostPct <= 30 ? 'bg-green-500' : calc.actualFoodCostPct <= 35 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, calc.actualFoodCostPct)}%` }} />
                      </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><DollarSign size={18} className="text-primary" /> Per Serving</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Menu Price (ex. VAT)</span>
                          <span className="font-semibold">฿{fmt((parseFloat(actualMenuPrice) || 0) / (1 + vatPct / 100))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Food Cost</span>
                          <span className="font-semibold text-red-600">- ฿{fmt(calc.costPerServing)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-bold text-gray-900">Gross Profit</span>
                          <span className={`font-bold ${calc.profitPerServing >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ฿{fmt(calc.profitPerServing)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Margin</span>
                          <span className={`font-semibold ${calc.profitMarginPct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fmt(calc.profitMarginPct)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Benchmarks */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Info size={16} className="text-primary" /> Industry Benchmarks</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    {[['Food Cost %', '28–32%', '< 35%'], ['Gross Margin', '> 65%', '> 60%'], ['Waste Factor', '5–10%', '< 15%']].map(([label, ideal, max]) => (
                      <div key={label} className="flex justify-between">
                        <span>{label}</span>
                        <span><span className="text-green-600 font-semibold">{ideal}</span> <span className="text-gray-400">(max {max})</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Banner */}
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              { icon: <ChefHat size={22} />, title: 'Control Waste', text: 'A 5% reduction in food waste directly adds 5% to your food cost margin. Train kitchen staff on proper prep and FIFO storage.' },
              { icon: <TrendingUp size={22} />, title: 'Analyse Menu Mix', text: 'Use your POS data to find which dishes have the best combination of high margin and high popularity — your "Stars".' },
              { icon: <DollarSign size={22} />, title: 'Review Pricing Regularly', text: 'Ingredient costs change seasonally. Re-calculate your food cost monthly and adjust menu prices accordingly.' }
            ].map((tip, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl p-5">
                <div className="text-primary mb-2">{tip.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FoodCostCalculator
