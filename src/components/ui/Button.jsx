import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const MotionLink = motion.create(Link)

const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-black',
  brand: 'bg-brand text-paper hover:bg-brand-deep',
  secondary: 'border border-line-strong bg-transparent text-ink hover:border-ink',
  ghost: 'text-ink hover:bg-canvas',
  light: 'bg-paper text-ink hover:bg-canvas',
  outlineLight: 'border border-paper/40 text-paper hover:border-paper',
}

const SIZES = {
  sm: 'h-9 px-3.5',
  md: 'h-11 px-5',
  lg: 'h-12 px-6',
}

export default function Button({ to, href, variant = 'primary', size = 'md', className, children, ...rest }) {
  const classes = cn(
    'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control text-button transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  if (to) {
    return (
      <MotionLink to={to} whileTap={{ scale: 0.98 }} className={classes} {...rest}>
        {children}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a href={href} whileTap={{ scale: 0.98 }} className={classes} {...rest}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" whileTap={{ scale: 0.98 }} className={classes} {...rest}>
      {children}
    </motion.button>
  )
}
