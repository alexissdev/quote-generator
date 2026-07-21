import type { HistoryEntry } from '../../domain/types'
import { formatDate, formatMoney, formatTicketNumber } from '../../domain/formatters'

interface HistoryItemProps {
  entry: HistoryEntry
  onDuplicate: (entry: HistoryEntry) => void
}

export function HistoryItem({ entry, onDuplicate }: HistoryItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-petrol-800 py-2 text-sm last:border-b-0">
      <div className="flex flex-col">
        <span className="font-mono text-rust-400">{formatTicketNumber(entry.number)}</span>
        <span className="text-bone-200">{entry.site}</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-bone-100">{formatMoney(entry.amount)}</span>
        <span className="text-xs text-petrol-500">{formatDate(entry.date)}</span>
        <button
          type="button"
          onClick={() => onDuplicate(entry)}
          className="text-xs text-rust-400 underline decoration-dotted hover:text-rust-300"
        >
          Duplicar
        </button>
      </div>
    </li>
  )
}
