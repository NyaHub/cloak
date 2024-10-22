import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null, // Получение токена из localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Сохранение токена в localStorage
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('token'); // Удаление токена из localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;