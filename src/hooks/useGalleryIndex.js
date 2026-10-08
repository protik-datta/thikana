import { useCallback, useState } from 'react'

export function useGalleryIndex(count) {
  const [state, setState] = useState({ index: 0, direction: 1 })

  const go = useCallback(
    (delta) => setState((current) => ({ index: (current.index + delta + count) % count, direction: delta })),
    [count],
  )

  const select = useCallback(
    (next) => setState((current) => ({ index: next, direction: next >= current.index ? 1 : -1 })),
    [],
  )

  return { ...state, go, select }
}
