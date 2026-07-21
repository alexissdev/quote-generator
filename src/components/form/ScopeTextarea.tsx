import { CHECKBOX_CLASS, INPUT_CLASS, LABEL_CLASS } from './inputStyles'

interface ScopeTextareaProps {
  value: string
  onChange: (value: string) => void
  materialsIncluded: boolean
  onMaterialsIncludedChange: (value: boolean) => void
}

export function ScopeTextarea({
  value,
  onChange,
  materialsIncluded,
  onMaterialsIncludedChange,
}: ScopeTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Alcance del trabajo (un ítem por renglón)</span>
        <textarea
          className={`${INPUT_CLASS} min-h-32 resize-y font-mono text-sm`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <label className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          className={CHECKBOX_CLASS}
          checked={materialsIncluded}
          onChange={(event) => onMaterialsIncludedChange(event.target.checked)}
        />
        <span className="text-sm text-bone-200">Materiales incluidos</span>
      </label>
    </div>
  )
}
