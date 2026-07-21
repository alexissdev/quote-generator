import {
  TAX_PERCENTAGE,
  computeTaxAmount,
  computeFinalAmount,
  formatMoney,
} from '../../domain/formatters'

interface AmountBoxProps {
  amount: number
  withTax: boolean
}

export function AmountBox({ amount, withTax }: AmountBoxProps) {
  return (
    <div className="rounded bg-rust-500 px-4 py-3 text-bone-100 shadow-md">
      {withTax && (
        <div className="mb-1.5 flex flex-col gap-0.5 border-b border-bone-100/25 pb-1.5 font-mono text-xs opacity-90">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatMoney(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span>IVA ({TAX_PERCENTAGE}%)</span>
            <span>{formatMoney(computeTaxAmount(amount, withTax))}</span>
          </div>
        </div>
      )}
      <p className="text-xs tracking-wide uppercase opacity-90">
        {withTax ? 'Valor total (IVA incluido)' : 'Valor total'}
      </p>
      <p className="font-mono text-2xl font-bold sm:text-3xl">
        {formatMoney(computeFinalAmount(amount, withTax))}
      </p>
    </div>
  )
}
