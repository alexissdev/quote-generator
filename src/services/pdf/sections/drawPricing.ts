import type jsPDF from 'jspdf'
import type { Quote } from '../../../domain/types'
import {
  TAX_PERCENTAGE,
  computeTaxAmount,
  computeFinalAmount,
  formatMoney,
} from '../../../domain/formatters'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'
import { ensureSpace } from './pageBreak'

const BOX_HEIGHT_SIMPLE_MM = 24
const BOX_HEIGHT_WITH_TAX_MM = 38

export function drawPricing(doc: jsPDF, quote: Quote, y: number): number {
  const { marginLeft } = PDF_LAYOUT
  const boxHeight = quote.withTax ? BOX_HEIGHT_WITH_TAX_MM : BOX_HEIGHT_SIMPLE_MM
  const startY = ensureSpace(doc, quote, y, boxHeight + 10)
  const finalAmount = computeFinalAmount(quote.amount, quote.withTax)

  doc.setFillColor(...PDF_COLORS.rust)
  doc.roundedRect(marginLeft, startY, usableWidth(), boxHeight, 2, 2, 'F')

  doc.setTextColor(...PDF_COLORS.white)
  let cursorY = startY + 8

  if (quote.withTax) {
    doc.setFont('courier', 'normal')
    doc.setFontSize(9)
    doc.text('Subtotal', marginLeft + 6, cursorY)
    doc.text(formatMoney(quote.amount), marginLeft + usableWidth() - 6, cursorY, { align: 'right' })
    cursorY += 5

    doc.text(`IVA (${TAX_PERCENTAGE}%)`, marginLeft + 6, cursorY)
    doc.text(
      formatMoney(computeTaxAmount(quote.amount, true)),
      marginLeft + usableWidth() - 6,
      cursorY,
      {
        align: 'right',
      },
    )
    cursorY += 7
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(quote.withTax ? 'VALOR TOTAL (IVA incluido)' : 'VALOR TOTAL', marginLeft + 6, cursorY)
  cursorY += 10

  doc.setFont('courier', 'bold')
  doc.setFontSize(19)
  doc.text(formatMoney(finalAmount), marginLeft + 6, cursorY)

  return startY + boxHeight + 10
}
