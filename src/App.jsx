import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { AppProvider } from '@/context/AppContext'
import ToastContainer from '@/components/ui/Toast'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer />
      </AppProvider>
    </MotionConfig>
  )
}
