import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

const AppContext = createContext(null)

const MAX_RECENTLY_VIEWED = 8
const MAX_COMPARE = 3

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

function safeParseObject(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

function loadInitialState() {
  return {
    favorites: safeParse('thikana_favorites', []),
    compareIds: safeParse('thikana_compare', []),
    recentlyViewed: safeParse('thikana_recent', []),
    inquiries: safeParse('thikana_inquiries', []),
    viewings: safeParse('thikana_viewings', []),
    toasts: [],
    account: safeParseObject('thikana_account', {
      name: 'Demo User',
      email: 'demo@thikana.example',
      phone: '+880 1700 000 000',
    }),
  }
}

let toastId = 0

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.includes(action.id)
      return {
        ...state,
        favorites: exists ? state.favorites.filter((id) => id !== action.id) : [...state.favorites, action.id],
      }
    }

    case 'ADD_COMPARE': {
      if (state.compareIds.includes(action.id) || state.compareIds.length >= MAX_COMPARE) return state
      return { ...state, compareIds: [...state.compareIds, action.id] }
    }

    case 'REMOVE_COMPARE':
      return { ...state, compareIds: state.compareIds.filter((id) => id !== action.id) }

    case 'CLEAR_COMPARE':
      return { ...state, compareIds: [] }

    case 'ADD_RECENTLY_VIEWED': {
      const filtered = state.recentlyViewed.filter((id) => id !== action.id)
      return { ...state, recentlyViewed: [action.id, ...filtered].slice(0, MAX_RECENTLY_VIEWED) }
    }

    case 'ADD_INQUIRY':
      return { ...state, inquiries: [action.inquiry, ...state.inquiries] }

    case 'ADD_VIEWING':
      return { ...state, viewings: [action.viewing, ...state.viewings] }

    case 'UPDATE_ACCOUNT':
      return { ...state, account: { ...state.account, ...action.data } }

    case 'SHOW_TOAST':
      return { ...state, toasts: [...state.toasts, { id: ++toastId, message: action.message }] }

    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState)
  const prevRef = useRef(state)

  useEffect(() => {
    const prev = prevRef.current
    prevRef.current = state
    if (prev.favorites !== state.favorites) localStorage.setItem('thikana_favorites', JSON.stringify(state.favorites))
    if (prev.compareIds !== state.compareIds) localStorage.setItem('thikana_compare', JSON.stringify(state.compareIds))
    if (prev.recentlyViewed !== state.recentlyViewed) localStorage.setItem('thikana_recent', JSON.stringify(state.recentlyViewed))
    if (prev.inquiries !== state.inquiries) localStorage.setItem('thikana_inquiries', JSON.stringify(state.inquiries))
    if (prev.viewings !== state.viewings) localStorage.setItem('thikana_viewings', JSON.stringify(state.viewings))
    if (prev.account !== state.account) localStorage.setItem('thikana_account', JSON.stringify(state.account))
  }, [state])

  const toast = useCallback((message) => {
    dispatch({ type: 'SHOW_TOAST', message })
  }, [])

  const toggleFavorite = useCallback(
    (id) => {
      const willRemove = state.favorites.includes(id)
      dispatch({ type: 'TOGGLE_FAVORITE', id })
      toast(willRemove ? 'Property removed from saved' : 'Property saved')
    },
    [state.favorites, toast],
  )

  const isFavorite = useCallback((id) => state.favorites.includes(id), [state.favorites])

  const addCompare = useCallback(
    (id) => {
      if (state.compareIds.includes(id)) {
        toast('Already in comparison')
        return
      }
      if (state.compareIds.length >= MAX_COMPARE) {
        toast('Compare up to 3 properties at a time')
        return
      }
      dispatch({ type: 'ADD_COMPARE', id })
      toast('Added to comparison')
    },
    [state.compareIds, toast],
  )

  const removeCompare = useCallback(
    (id) => {
      dispatch({ type: 'REMOVE_COMPARE', id })
      toast('Removed from comparison')
    },
    [toast],
  )

  const clearCompare = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPARE' })
  }, [])

  const isComparing = useCallback((id) => state.compareIds.includes(id), [state.compareIds])

  const addRecentlyViewed = useCallback((id) => {
    dispatch({ type: 'ADD_RECENTLY_VIEWED', id })
  }, [])

  const addInquiry = useCallback(
    (inquiry) => {
      dispatch({ type: 'ADD_INQUIRY', inquiry: { ...inquiry, id: Date.now(), date: new Date().toISOString() } })
      toast('Inquiry sent to agent')
    },
    [toast],
  )

  const addViewing = useCallback(
    (viewing) => {
      dispatch({ type: 'ADD_VIEWING', viewing: { ...viewing, id: Date.now(), date: new Date().toISOString() } })
      toast('Viewing request submitted')
    },
    [toast],
  )

  const updateAccount = useCallback((data) => {
    dispatch({ type: 'UPDATE_ACCOUNT', data })
  }, [])

  const dismissToast = useCallback((id) => {
    dispatch({ type: 'DISMISS_TOAST', id })
  }, [])

  const value = useMemo(
    () => ({
      favorites: state.favorites,
      compareIds: state.compareIds,
      recentlyViewed: state.recentlyViewed,
      inquiries: state.inquiries,
      viewings: state.viewings,
      toasts: state.toasts,
      account: state.account,
      toggleFavorite,
      isFavorite,
      addCompare,
      removeCompare,
      clearCompare,
      isComparing,
      addRecentlyViewed,
      addInquiry,
      addViewing,
      updateAccount,
      dismissToast,
      toast,
    }),
    [state, toggleFavorite, isFavorite, addCompare, removeCompare, clearCompare, isComparing, addRecentlyViewed, addInquiry, addViewing, updateAccount, dismissToast, toast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
