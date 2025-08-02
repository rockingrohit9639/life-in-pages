import colors from 'tailwindcss/colors'

export function getProgressColor(progress: number): string {
  if (progress < 50) return colors.red[500]
  if (progress < 75) return colors.yellow[500]
  return colors.green[500]
}
