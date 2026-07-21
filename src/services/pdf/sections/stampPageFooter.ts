import type jsPDF from 'jspdf'
import { buildContactText } from '../../../domain/formatters'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'

export function stampPageFooter(doc: jsPDF): void {
  const { marginLeft, marginRight, pageWidth, pageHeight, marginBottom } = PDF_LAYOUT
  const lineY = pageHeight - marginBottom + 6
  const totalPages = doc.getNumberOfPages()

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page)

    doc.setDrawColor(...PDF_COLORS.textMuted)
    doc.setLineWidth(0.2)
    doc.line(marginLeft, lineY, marginLeft + usableWidth(), lineY)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...PDF_COLORS.textMuted)
    doc.text(buildContactText(), marginLeft, lineY + 5)

    if (totalPages > 1) {
      doc.text(`Página ${page} de ${totalPages}`, pageWidth - marginRight, lineY + 5, {
        align: 'right',
      })
    }
  }
}
