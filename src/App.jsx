import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Upgrade from './pages/Upgrade'
import Login from './pages/Login'
import NotificationSettings from './pages/NotificationSettings'
import FeatureDetail from './pages/FeatureDetail'
import BottomNav from './components/BottomNav'
import { ThemeProvider } from './lib/theme'
import { logActivity } from './lib/progressStore'

function Shell({ children }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-[var(--chalk)]">
      {children}
    </div>
  )
}

function Layout({ children }) {
  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar">{children}</div>
      <BottomNav />
    </Shell>
  )
}

export default function App() {
  useEffect(() => {
    logActivity()
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/feature/:id" element={<Layout><FeatureDetail /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/upgrade" element={<Shell><Upgrade /></Shell>} />
          <Route path="/login" element={<Shell><Login /></Shell>} />
          <Route path="/notifications" element={<Shell><NotificationSettings /></Shell>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
