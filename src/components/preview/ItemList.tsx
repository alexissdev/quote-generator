import type { ScopeItem } from '../../domain/types'

interface ItemListProps {
  items: ScopeItem[]
}

export function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-petrol-600 italic">Sin ítems cargados todavía.</p>
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 text-sm text-petrol-900">
          <span className="text-rust-500">▸</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  )
}
