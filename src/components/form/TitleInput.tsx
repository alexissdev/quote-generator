import { INPUT_CLASS, LABEL_CLASS } from './inputStyles'

interface TitleInputProps {
  value: string
  onChange: (value: string) => void
}

export function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={LABEL_CLASS}>Título del trabajo</span>
      <input
        type="text"
        className={INPUT_CLASS}
        placeholder="Ej: Pintura exterior e impermeabilización"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
