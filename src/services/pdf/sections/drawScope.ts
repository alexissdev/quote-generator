import type jsPDF from 'jspdf'
import type { Quote } from '../../../domain/types'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'
import { ensureSpace } from './pageBreak'

export function drawScope(doc: jsPDF, quote: Quote, y: number): number {
  const { marginLeft } = PDF_LAYOUT
  let cursorY = ensureSpace(doc, quote, y, 24)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...PDF_COLORS.petrol)
  doc.text(quote.title, marginLeft, cursorY)
  cursorY += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...PDF_COLORS.textDark)
  doc.text(`Obra: ${quote.site}`, marginLeft, cursorY)
  cursorY += 10

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...PDF_COLORS.petrol)
  doc.text('Alcance del trabajo', marginLeft, cursorY)
  cursorY += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...PDF_COLORS.textDark)
  for (const item of quote.scopeItems) {
    const lines: string[] = doc.splitTextToSize(`•  ${item.description}`, usableWidth() - 4)
    const itemHeight = lines.length * 5 + 2
    cursorY = ensureSpace(doc, quote, cursorY, itemHeight)
    doc.text(lines, marginLeft + 2, cursorY)
    cursorY += itemHeight
  }

  return cursorY + 6
}
