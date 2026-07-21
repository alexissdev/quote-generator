import { ERROR_CLASS, INPUT_CLASS, LABEL_CLASS } from './inputStyles'

interface SiteInputProps {
  value: string
  onChange: (value: string) => void
  error: string | null
}

export function SiteInput({ value, onChange, error }: SiteInputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={LABEL_CLASS}>Obra / Cliente</span>
      <input
        type="text"
        className={INPUT_CLASS}
        placeholder="Ej: Laprida"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className={ERROR_CLASS}>{error}</span>}
    </label>
  )
}
