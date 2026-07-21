import { useRef } from 'react'

interface BackupActionsProps {
  onExport: () => void
  onImport: (file: File) => void
}

export function BackupActions({ onExport, onImport }: BackupActionsProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0]
    if (file) onImport(file)
    event.target.value = ''
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      <button
        type="button"
        onClick={onExport}
        className="text-petrol-400 underline decoration-dotted hover:text-bone-200"
      >
        Exportar backup
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-petrol-400 underline decoration-dotted hover:text-bone-200"
      >
        Importar backup
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
