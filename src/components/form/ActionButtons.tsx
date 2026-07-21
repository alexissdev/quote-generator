interface ActionButtonsProps {
  onDownloadPdf: () => void
  onShareWhatsapp: () => void
  onNewQuote: () => void
  disabled: boolean
}

const SECONDARY_BUTTON_CLASS =
  'font-display min-h-14 flex-1 rounded border-2 border-petrol-700 px-4 text-sm tracking-wide text-bone-200 uppercase transition hover:border-rust-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40'

export function ActionButtons({
  onDownloadPdf,
  onShareWhatsapp,
  onNewQuote,
  disabled,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <button
        type="button"
        onClick={onDownloadPdf}
        disabled={disabled}
        className="font-display min-h-14 w-full rounded bg-rust-500 text-lg tracking-wide text-bone-100 uppercase shadow-lg shadow-rust-700/30 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-petrol-700 disabled:text-petrol-500 disabled:shadow-none"
      >
        Descargar PDF
      </button>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onShareWhatsapp}
          disabled={disabled}
          className={SECONDARY_BUTTON_CLASS}
        >
          Compartir por WhatsApp
        </button>
        <button type="button" onClick={onNewQuote} className={SECONDARY_BUTTON_CLASS}>
          Nuevo presupuesto
        </button>
      </div>
    </div>
  )
}
