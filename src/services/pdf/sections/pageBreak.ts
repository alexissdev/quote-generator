import type jsPDF from 'jspdf'
import type { Quote } from '../../../domain/types'
import { formatTicketNumber } from '../../../domain/formatters'
import { COMPANY_NAME } from '../../../domain/constants'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'

const CONTINUATION_HEADER_HEIGHT_MM = 16

function drawContinuationHeader(doc: jsPDF, quote: Quote): number {
  const { marginLeft, marginTop } = PDF_LAYOUT

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...PDF_COLORS.petrol)
  doc.text(
    `${COMPANY_NAME} — Presupuesto ${formatTicketNumber(quote.number)} (continuación)`,
    marginLeft,
    marginTop,
  )

  doc.setDrawColor(...PDF_COLORS.rust)
  doc.setLineWidth(0.5)
  doc.line(marginLeft, marginTop + 3, marginLeft + usableWidth(), marginTop + 3)

  return marginTop + CONTINUATION_HEADER_HEIGHT_MM
}

export function ensureSpace(doc: jsPDF, quote: Quote, y: number, requiredHeight: number): number {
  const maxY = PDF_LAYOUT.pageHeight - PDF_LAYOUT.marginBottom
  if (y + requiredHeight <= maxY) return y

  doc.addPage()
  return drawContinuationHeader(doc, quote)
}
