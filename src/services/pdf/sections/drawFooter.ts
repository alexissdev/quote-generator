import type jsPDF from 'jspdf'
import type { Quote } from '../../../domain/types'
import { buildPaymentTermsText, buildValidityText, formatDate } from '../../../domain/formatters'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'
import { ensureSpace } from './pageBreak'

export function drawFooter(doc: jsPDF, quote: Quote, y: number): number {
  const { marginLeft } = PDF_LAYOUT
  let cursorY = ensureSpace(doc, quote, y, 30)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...PDF_COLORS.petrol)
  doc.text('Condiciones de pago', marginLeft, cursorY)
  cursorY += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...PDF_COLORS.textDark)
  const termsLines: string[] = doc.splitTextToSize(
    buildPaymentTermsText(quote.paymentTerms),
    usableWidth(),
  )
  doc.text(termsLines, marginLeft, cursorY)
  cursorY += termsLines.length * 5 + 6

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.textMuted)
  doc.text(buildValidityText(quote.validityDays), marginLeft, cursorY)
  cursorY += 5
  doc.text(`Fecha de emisión: ${formatDate(quote.date)}`, marginLeft, cursorY)

  return cursorY
}
