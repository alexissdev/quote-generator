import type jsPDF from 'jspdf'
import type { Quote } from '../../../domain/types'
import { formatTicketNumber } from '../../../domain/formatters'
import { LOGO_BASE64 } from '../../../assets/logo'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'

const LOGO_WIDTH_MM = 55
const LOGO_ASPECT_RATIO = 480 / 214
const LOGO_HEIGHT_MM = LOGO_WIDTH_MM / LOGO_ASPECT_RATIO

export function drawHeader(doc: jsPDF, quote: Quote, y: number): number {
  const { marginLeft, marginRight, pageWidth } = PDF_LAYOUT

  try {
    doc.addImage(LOGO_BASE64, 'PNG', marginLeft, y, LOGO_WIDTH_MM, LOGO_HEIGHT_MM)
  } catch {}

  doc.setFont('courier', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...PDF_COLORS.rust)
  doc.text(formatTicketNumber(quote.number), pageWidth - marginRight, y + LOGO_HEIGHT_MM / 2, {
    align: 'right',
  })

  const lineY = y + LOGO_HEIGHT_MM + 6
  doc.setDrawColor(...PDF_COLORS.rust)
  doc.setLineWidth(0.8)
  doc.line(marginLeft, lineY, marginLeft + usableWidth(), lineY)

  return lineY + 10
}
