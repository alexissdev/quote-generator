export interface SharePayload {
  text: string
  pdfBlob: Blob
  fileName: string
}

export interface ShareService {
  shareQuote(payload: SharePayload): Promise<void>
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

function shareByWhatsappLink(text: string): void {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export class WebShareService implements ShareService {
  async shareQuote({ text, pdfBlob, fileName }: SharePayload): Promise<void> {
    const file = new File([pdfBlob], fileName, { type: 'application/pdf' })

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text })
        return
      } catch (error) {
        if (isAbortError(error)) return
      }
    }

    shareByWhatsappLink(text)
  }
}

export const shareService: ShareService = new WebShareService()
