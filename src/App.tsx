import { Outlet } from 'react-router'
import { Toaster } from './modules/common/components/Toaster'

function App() {
  return (
    <div className="App">
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App
