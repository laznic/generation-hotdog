import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 

import './index.css'
import Room from '@/modules/room/components/Room'
import CreateRoomButton from './modules/home/components/CreateRoomButton'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CreateRoomButton />,
      },
      {
        path: '/room/:roomId',
        element: <Room />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)