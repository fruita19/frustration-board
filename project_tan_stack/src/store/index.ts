import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
})

// Typy pomocnicze dla TypeScriptu
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch