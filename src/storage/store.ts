import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_KEY, UserState } from "./user.slice";
import cartSlice from "./cart.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  },
});

store.subscribe(() => {
  saveState<UserState>(JWT_KEY, { jwt: store.getState().user.jwt });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
