import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

// Sprawdzamy localStorage, żeby po odświeżeniu (F5) użytkownik nadal był zalogowany
const initialState: AuthState = {
  isLoggedIn: typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") === "true" : false,
  username: typeof window !== "undefined" ? localStorage.getItem("username") || "" : ""
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Akcja logowania - przyjmuje tekst (username) jako payload
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", action.payload);
      }
    },
    // Akcja wylogowania - czyści stan i pamięć przeglądarki
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
      }
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer