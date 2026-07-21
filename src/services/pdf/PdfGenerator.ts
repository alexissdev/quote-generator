import jsPDF from 'jspdf'
import type { Quote } from '../../domain/types'
import { drawHeader } from './sections/drawHeader'
import { drawScope } from './sections/drawScope'
import { drawPricing } from './sections/drawPricing'
import { drawFooter } from './sections/drawFooter'
import { drawSignature } from './sections/drawSignature'
import { stampPageFooter } from './sections/stampPageFooter'
import { PDF_LAYOUT } from './sections/layout'

export type PdfSection = (doc: jsPDF, quote: Quote, y: number) => number

const DEFAULT_SECTIONS: PdfSection[] = [
  drawHeader,
  drawScope,
  drawPricing,
  drawFooter,
  drawSignature,
]

export interface PdfGenerator {
  buildFileName(quote: Quote): string
  buildBlob(quote: Quote): Blob
  download(quote: Quote): void
}

export class JsPdfQuoteGenerator implements PdfGenerator {
  private readonly sections: PdfSection[]

  constructor(sections: PdfSection[] = DEFAULT_SECTIONS) {
    this.sections = sections
  }

  private build(quote: Quote): jsPDF {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    let y: number = PDF_LAYOUT.marginTop
    for (const drawSection of this.sections) {
      y = drawSection(doc, quote, y)
    }
    stampPageFooter(doc)
    return doc
  }

  buildFileName(quote: Quote): string {
    const siteSlug = quote.site.trim().replace(/\s+/g, '_') || 'SinObra'
    return `Presupuesto_${siteSlug}_Braian_Costa_Construcciones.pdf`
  }

  buildBlob(quote: Quote): Blob {
    return this.build(quote).output('blob')
  }

  download(quote: Quote): void {
    const doc = this.build(quote)
    doc.save(this.buildFileName(quote))
  }
}

export const pdfGenerator: PdfGenerator = new JsPdfQuoteGenerator()
