export interface ShareService {
  shareText(text: string): void
}

export class WhatsappShareService implements ShareService {
  shareText(text: string): void {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

export const whatsappShareService: ShareService = new WhatsappShareService()
