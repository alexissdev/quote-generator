import type { BackupPayload } from '../../domain/types'
import { parseBackupPayload } from '../../domain/validators'

export interface BackupService {
  buildFileName(): string
  downloadBackup(payload: BackupPayload): void
  readBackupFile(file: File): Promise<BackupPayload>
}

export class JsonBackupService implements BackupService {
  buildFileName(): string {
    const today = new Date().toISOString().slice(0, 10)
    return `Backup_Presupuestos_Braian_Costa_Construcciones_${today}.json`
  }

  downloadBackup(payload: BackupPayload): void {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = this.buildFileName()
    link.click()

    URL.revokeObjectURL(url)
  }

  async readBackupFile(file: File): Promise<BackupPayload> {
    const text = await file.text()

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error('El archivo no es un JSON válido.')
    }

    const payload = parseBackupPayload(data)
    if (payload === null) {
      throw new Error('El archivo no tiene el formato de un backup de presupuestos.')
    }

    return payload
  }
}

export const backupService: BackupService = new JsonBackupService()
