import ReactDOM from 'react-dom/client'
import './style.css'
import { LogsTable } from './LogsTable'
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from './components/ToastProvider'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start min-w-[320px]">
      <div className="max-w-[1280px] w-full mx-auto px-8 text-center py-8">
        <div className="flex justify-center md:justify-start items-center md:items-start gap-3 mb-6">
          <img src="/images/logo.png" alt="Logo" className="max-w-[200px] filter brightness-0" />
        </div>
        <LogsTable />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <HeroUIProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </HeroUIProvider>
)
