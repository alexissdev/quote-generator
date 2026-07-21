import { AppLayout } from './components/layout/AppLayout'
import { QuoteForm } from './components/form/QuoteForm'
import { QuotePreview } from './components/preview/QuotePreview'
import { HistoryPanel } from './components/history/HistoryPanel'
import { useQuoteForm } from './hooks/useQuoteForm'
import { useQuoteHistory } from './hooks/useQuoteHistory'
import { useBackup } from './hooks/useBackup'
import { pdfGenerator } from './services/pdf/PdfGenerator'
import { whatsappShareService } from './services/share/WhatsappShareService'
import { buildWhatsappText } from './domain/formatters'
import type { HistoryEntry } from './domain/types'

function App() {
  const form = useQuoteForm()
  const { history, addEntry } = useQuoteHistory()
  const { exportBackup, importBackup } = useBackup()

  function handleDownloadPdf() {
    if (!form.isValid) return

    pdfGenerator.download(form.quote)
    addEntry(form.quote)
  }

  function handleShareWhatsapp() {
    if (!form.isValid) return

    whatsappShareService.shareText(buildWhatsappText(form.quote))
  }

  function handleDuplicate(entry: HistoryEntry) {
    form.loadQuote(entry)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleImportBackup(file: File) {
    const confirmed = window.confirm(
      'Importar este backup va a reemplazar el historial y el N° de ticket actuales. ¿Continuar?',
    )
    if (!confirmed) return

    importBackup(file).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : 'No se pudo importar el backup.'
      window.alert(message)
    })
  }

  return (
    <AppLayout
      form={<QuoteForm form={form} onDownloadPdf={handleDownloadPdf} onShareWhatsapp={handleShareWhatsapp} />}
      preview={<QuotePreview quote={form.quote} />}
      history={
        <HistoryPanel
          history={history}
          onDuplicate={handleDuplicate}
          onExportBackup={exportBackup}
          onImportBackup={handleImportBackup}
        />
      }
    />
  )
}

export default App
