import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import './index.css'
import Room from '@/modules/room/components/Room'
import HotdogDetails from './modules/details/components/HotdogDetails'
import Main from './modules/home/components/Main'
import Wall from './modules/wall/components/Wall'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/room/:roomId',
        element: <Room />,
      },
      {
        path: '/wall',
        element: <Wall />,
      },
      {
        path: '/wall/:id',
        element: <HotdogDetails />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)