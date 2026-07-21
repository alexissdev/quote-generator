import type jsPDF from 'jspdf'
import type { Quote } from '../../../domain/types'
import { COMPANY_NAME } from '../../../domain/constants'
import { PDF_LAYOUT, PDF_COLORS, usableWidth } from './layout'
import { ensureSpace } from './pageBreak'

const SECTION_HEIGHT_MM = 30

export function drawSignature(doc: jsPDF, quote: Quote, y: number): number {
  const startY = ensureSpace(doc, quote, y, SECTION_HEIGHT_MM)
  const { marginLeft } = PDF_LAYOUT
  const columnWidth = usableWidth() / 2 - 8
  const lineY = startY + 18

  doc.setDrawColor(...PDF_COLORS.textMuted)
  doc.setLineWidth(0.3)
  doc.line(marginLeft, lineY, marginLeft + columnWidth, lineY)
  doc.line(marginLeft + usableWidth() - columnWidth, lineY, marginLeft + usableWidth(), lineY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.textMuted)
  doc.text(`Firma y aclaración — ${COMPANY_NAME}`, marginLeft, lineY + 5)
  doc.text('Firma y aclaración — Cliente', marginLeft + usableWidth() - columnWidth, lineY + 5)

  return lineY + 10
}
