import { backupService, type BackupService } from '../services/backup/BackupService'
import { quoteRepository, type QuoteRepository } from '../services/storage/QuoteRepository'

export interface UseBackupResult {
  exportBackup: () => void
  importBackup: (file: File) => Promise<void>
}

export function useBackup(
  repository: QuoteRepository = quoteRepository,
  service: BackupService = backupService,
): UseBackupResult {
  function exportBackup(): void {
    service.downloadBackup(repository.exportBackup())
  }

  async function importBackup(file: File): Promise<void> {
    const payload = await service.readBackupFile(file)
    repository.importBackup(payload)
    window.location.reload()
  }

  return { exportBackup, importBackup }
}
