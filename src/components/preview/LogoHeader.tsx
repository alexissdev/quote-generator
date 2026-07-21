import { LOGO_BASE64 } from '../../assets/logo'
import { COMPANY_NAME } from '../../domain/constants'
import { formatTicketNumber } from '../../domain/formatters'

interface LogoHeaderProps {
  number: number
}

export function LogoHeader({ number }: LogoHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b-2 border-dashed border-petrol-700/40 pb-3">
      <img src={LOGO_BASE64} alt={COMPANY_NAME} className="h-14 w-auto object-contain" />
      <span className="font-mono text-sm font-bold text-rust-600">
        {formatTicketNumber(number)}
      </span>
    </div>
  )
}
