export function printDocument({ title, subtitle, sections, filename = 'cloudnet-report' }) {
  const logoUrl = `${window.location.origin}/logoblack.png`
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  const sectionsHtml = sections.map((section) => {
    if (section.type === 'table') {
      return `
        <div class="section">
          <h3>${section.title}</h3>
          <table>
            <thead><tr>${section.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>
              ${section.rows.map((row) => `<tr>${row.map((cell, i) => `<td class="${i > 0 ? 'num' : ''} ${cell.cls || ''}">${cell.value !== undefined ? cell.value : cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>`
    }
    if (section.type === 'kpi') {
      return `
        <div class="section">
          <h3>${section.title}</h3>
          <div class="kpi-grid">
            ${section.items.map((item) => `
              <div class="kpi-card ${item.status || ''}">
                <div class="kpi-label">${item.label}</div>
                <div class="kpi-value">${item.value}</div>
                ${item.note ? `<div class="kpi-note">${item.note}</div>` : ''}
              </div>`).join('')}
          </div>
        </div>`
    }
    if (section.type === 'pl') {
      return `
        <div class="section">
          <h3>${section.title}</h3>
          <table class="pl-table">
            ${section.rows.map((row) => `
              <tr class="${row.bold ? 'bold-row' : ''} ${row.border ? 'border-row' : ''} ${row.indent ? 'indent-row' : ''}">
                <td>${row.label}</td>
                <td class="num ${row.negative ? 'neg' : row.positive ? 'pos' : ''}">${row.value}</td>
                <td class="num pct">${row.pct || ''}</td>
              </tr>`).join('')}
          </table>
        </div>`
    }
    if (section.type === 'list') {
      return `
        <div class="section">
          <h3>${section.title}</h3>
          <ul>${section.items.map((i) => `<li>${i}</li>`).join('')}</ul>
        </div>`
    }
    return ''
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title} — CloudNet Softwares</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #1a1a1a; background: #fff; }
    @page { size: A4; margin: 0; }

    /* Page wrapper — provides visible margins in preview AND in print */
    .page-wrapper { padding: 18mm 18mm 26mm 18mm; min-height: 100vh; }

    /* Header */
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #e65c00; padding-bottom: 12px; margin-bottom: 18px; }
    .header-logo img { height: 44px; width: auto; }
    .header-info { text-align: right; }
    .header-info .report-title { font-size: 18px; font-weight: 700; color: #e65c00; margin-bottom: 2px; }
    .header-info .report-sub { font-size: 11px; color: #666; }
    .header-info .report-date { font-size: 10px; color: #999; margin-top: 4px; }

    /* Footer — fixed at bottom, padding matches wrapper side margins */
    .footer { position: fixed; bottom: 0; left: 0; right: 0; border-top: 2px solid #e65c00; padding: 6px 18mm; display: flex; justify-content: space-between; align-items: center; background: #fff; }
    .footer-brand { font-size: 10px; font-weight: 700; color: #e65c00; }
    .footer-contact { font-size: 10px; color: #666; }
    .footer-page { font-size: 10px; color: #999; }

    /* Body */
    .content { padding-bottom: 10px; }

    /* Section */
    .section { margin-bottom: 22px; page-break-inside: avoid; }
    .section h3 { font-size: 13px; font-weight: 700; color: #e65c00; border-bottom: 1px solid #fdd5b0; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.4px; }

    /* Table */
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    th { background: #e65c00; color: #fff; padding: 7px 10px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
    td { padding: 6px 10px; border-bottom: 1px solid #f0f0f0; }
    tr:nth-child(even) td { background: #fafafa; }
    td.num { text-align: right; font-family: 'Courier New', monospace; }
    td.neg { color: #c0392b; }
    td.pos { color: #27ae60; }
    td.pct { color: #666; font-size: 10px; }
    td.good { color: #27ae60; font-weight: 700; }
    td.warn { color: #e67e22; font-weight: 700; }
    td.bad { color: #c0392b; font-weight: 700; }

    /* P&L table */
    .pl-table td { padding: 5px 10px; border-bottom: 1px solid #f0f0f0; }
    .bold-row td { font-weight: 700; font-size: 12px; }
    .border-row td { border-top: 2px solid #333; padding-top: 8px; margin-top: 4px; }
    .indent-row td:first-child { padding-left: 24px; color: #666; }
    .indent-row td { font-size: 10px; }

    /* KPI grid */
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .kpi-card { border: 1.5px solid #e0e0e0; border-radius: 6px; padding: 10px 12px; }
    .kpi-card.good { border-color: #27ae60; background: #f0faf4; }
    .kpi-card.warn { border-color: #e67e22; background: #fef9f0; }
    .kpi-card.bad { border-color: #c0392b; background: #fdf0f0; }
    .kpi-label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #888; margin-bottom: 3px; }
    .kpi-value { font-size: 18px; font-weight: 800; color: #1a1a1a; }
    .kpi-card.good .kpi-value { color: #27ae60; }
    .kpi-card.warn .kpi-value { color: #e67e22; }
    .kpi-card.bad .kpi-value { color: #c0392b; }
    .kpi-note { font-size: 9px; color: #999; margin-top: 2px; }

    /* List */
    ul { padding-left: 18px; }
    li { margin-bottom: 4px; font-size: 11px; color: #444; }

    /* Disclaimer */
    .disclaimer { font-size: 9px; color: #aaa; border-top: 1px solid #eee; margin-top: 20px; padding-top: 8px; }
  </style>
</head>
<body>
  <div class="footer">
    <span class="footer-brand">Powered by CloudNet Softwares Co., Ltd.</span>
    <span class="footer-contact">+66-948712350 &nbsp;|&nbsp; info@cloudnetsoftwares.com &nbsp;|&nbsp; www.cloudnetsoftwares.com</span>
    <span class="footer-page">Generated: ${dateStr} ${timeStr}</span>
  </div>

  <div class="page-wrapper">
    <div class="header">
      <div class="header-logo">
        <img src="${logoUrl}" alt="CloudNet Softwares" onerror="this.style.display='none'" />
      </div>
      <div class="header-info">
        <div class="report-title">${title}</div>
        <div class="report-sub">${subtitle || 'CloudNet Softwares Business Tools'}</div>
        <div class="report-date">Generated on ${dateStr} at ${timeStr}</div>
      </div>
    </div>

    <div class="content">
      ${sectionsHtml}
      <p class="disclaimer">This report is generated by CloudNet Softwares tools for planning and analysis purposes only. Figures are based on user-entered data and should not be used as certified financial statements.</p>
    </div>
  </div>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) { alert('Please allow popups to export the report.'); return }
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => { win.print() }, 600)
}
