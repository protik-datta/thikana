export const EASE = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.16,
  base: 0.28,
  slow: 0.5,
}

export const VIEWPORT_ONCE = { once: true, margin: '0px 0px -80px 0px' }

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE } },
}

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE } },
}

export const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
}

export const stagger = (interval = 0.07, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: interval, delayChildren: delay } },
})

export const modal = {
  hidden: { opacity: 0, scale: 0.97, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: DURATION.fast, ease: EASE } },
}

const slide = (axis, from) => ({
  hidden: { [axis]: from },
  visible: { [axis]: 0, transition: { duration: 0.34, ease: EASE } },
  exit: { [axis]: from, transition: { duration: 0.24, ease: EASE } },
})

export const drawerLeft = slide('x', '-100%')
export const drawerRight = slide('x', '100%')
export const drawerBottom = slide('y', '100%')

export const toast = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, y: 6, transition: { duration: DURATION.fast, ease: EASE } },
}

export const imageHover = { scale: 1.03, transition: { duration: 0.5, ease: EASE } }

export const overlay = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: DURATION.fast, ease: EASE } },
}
