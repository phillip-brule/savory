interface LogoProps {
  variant?: 'brown' | 'green' | 'green-light'
  className?: string
}

const sources: Record<NonNullable<LogoProps['variant']>, string> = {
  brown: '/brand/logo-brown.png',
  green: '/brand/logo-green.png',
  'green-light': '/brand/logo-green-light.png',
}

export function Logo({ variant = 'brown', className = 'h-10 w-auto' }: LogoProps) {
  return (
    <img
      src={sources[variant]}
      alt="Savory Sips & Bites"
      className={className}
    />
  )
}
