import { Outlet } from 'react-router-dom'
import LinkWithAnimation from './modules/common/components/LinkWithAnimation';

import { Toaster } from './modules/common/components/Toaster'

function App() {
  return (
    <main className="App container mx-auto">
      <nav className="border-t border-white my-8">
        <ul className="flex items-center gap-16 font-bold text-3xl tracking-wide mt-8">
          <li>
            <LinkWithAnimation to={'/'}>
              HOME
            </LinkWithAnimation>
          </li>
          <li>
          <LinkWithAnimation to={'/wall'}>
              WALL
          </LinkWithAnimation>
          </li>
        </ul>
      </nav>

      <Outlet />
      <Toaster />
    </main>
  )
}

export default App
