import { useState } from 'react'
import type { HistoryEntry } from '../../domain/types'
import { filterHistoryBySite } from '../../domain/formatters'
import { HistoryItem } from './HistoryItem'
import { BackupActions } from './BackupActions'

interface HistoryPanelProps {
  history: HistoryEntry[]
  onDuplicate: (entry: HistoryEntry) => void
  onExportBackup: () => void
  onImportBackup: (file: File) => void
}

export function HistoryPanel({
  history,
  onDuplicate,
  onExportBackup,
  onImportBackup,
}: HistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredHistory = filterHistoryBySite(history, searchQuery)

  return (
    <section className="rounded-lg border-2 border-petrol-800 bg-petrol-900/60 p-4 sm:p-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="font-display text-sm tracking-widest text-bone-200 uppercase">
          Últimos presupuestos
        </h2>
        <BackupActions onExport={onExportBackup} onImport={onImportBackup} />
      </div>

      {history.length > 0 && (
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Buscar por obra..."
          className="mb-3 w-full rounded border-2 border-petrol-700 bg-petrol-900 px-3 py-2 text-sm text-bone-100 outline-none placeholder:text-petrol-500 focus:border-rust-500"
        />
      )}

      {history.length === 0 ? (
        <p className="text-sm text-petrol-500 italic">Todavía no generaste ningún presupuesto.</p>
      ) : filteredHistory.length === 0 ? (
        <p className="text-sm text-petrol-500 italic">
          No hay presupuestos que coincidan con "{searchQuery}".
        </p>
      ) : (
        <ul>
          {filteredHistory.map((entry) => (
            <HistoryItem key={entry.number} entry={entry} onDuplicate={onDuplicate} />
          ))}
        </ul>
      )}
    </section>
  )
}
