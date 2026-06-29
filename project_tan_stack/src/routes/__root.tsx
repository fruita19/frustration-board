import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@tanstack/react-router'

// 1. DODANE IMPORTY REDUXA:
import { Provider } from 'react-redux'
import { store } from '../store'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Frustration Board',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider store={store}>
          <main className='w-full flex h-screen'>
            <Outlet />
          </main>
        </Provider>
        
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}