import { motion } from 'framer-motion'
import { reveal, stagger, VIEWPORT_ONCE } from '@/lib/motion'

export function Reveal({ as = 'div', className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag variants={reveal} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function Stagger({ as = 'div', interval = 0.08, className, children }) {
  const Tag = motion[as]
  return (
    <Tag
      variants={stagger(interval)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={className}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'div', className, children }) {
  const Tag = motion[as]
  return (
    <Tag variants={reveal} className={className}>
      {children}
    </Tag>
  )
}
