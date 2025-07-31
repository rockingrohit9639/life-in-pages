type WhenProps = {
  condition: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function When({ condition, children, fallback = null }: WhenProps) {
  return condition ? children : fallback
}
