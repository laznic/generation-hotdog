import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Outlet, useParams } from 'react-router-dom'
import LinkWithAnimation from './modules/common/components/LinkWithAnimation';

import { Toaster } from './modules/common/components/Toaster'

function App() {
  const { roomId, id } = useParams()

  return (
    <main className="App">
      {!roomId && !id ? (
        <nav className="border-t border-neutral-100 my-8 container mx-auto">
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
      ) : 
        id ? (
          <nav className="border-t border-neutral-100 my-8 container mx-auto">
            <ul className="flex items-center gap-16 text-lg tracking-wide mt-8">
              <li>
                <LinkWithAnimation to={'/wall'}>
                  <span className="flex items-center">
                    <ArrowLeftIcon className="mr-2" />
                    Back to wall
                  </span>
                </LinkWithAnimation>
              </li>
            </ul>
          </nav>
        ) : (
        <nav className="border-t border-neutral-100 my-8 container mx-auto">
          <ul className="flex items-center gap-16 text-lg tracking-wide mt-8">
            <li>
              <LinkWithAnimation to={'/'}>
                <span className="flex items-center">
                  <ArrowLeftIcon className="mr-2" />
                  Back to home
                </span>
              </LinkWithAnimation>
            </li>
          </ul>
        </nav>
      )}

      <Outlet />
      <Toaster />

      <audio id="audio" src="/o-fortuna.mp3" preload="metadata" />
    </main>
  )
}

export default App
