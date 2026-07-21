export const PDF_LAYOUT = {
  pageWidth: 210,
  pageHeight: 297,
  marginLeft: 20,
  marginRight: 20,
  marginTop: 20,
  marginBottom: 28,
} as const

export function usableWidth(): number {
  return PDF_LAYOUT.pageWidth - PDF_LAYOUT.marginLeft - PDF_LAYOUT.marginRight
}

type RgbColor = [number, number, number]

export const PDF_COLORS = {
  petrol: [15, 42, 51] as RgbColor,
  rust: [184, 69, 31] as RgbColor,
  textDark: [33, 33, 33] as RgbColor,
  textMuted: [120, 120, 120] as RgbColor,
  white: [255, 255, 255] as RgbColor,
} as const
