import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTANT_KEY = "cartData";

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

// ! ! ! ЛУЧШЕ РЕАЛИЗОВАТЬ ХРАНЕНИЕ ПОДОБНОГО РОДА ИНФОРМАЦИИ НА БЕКЕНДЕ В БД, А НЕ В LOCALSTORAGE ! ! !
const initialState: CartState = {
  items: loadState<CartState>(CART_PERSISTANT_KEY)?.items ?? [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.count === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
        state.items.forEach((i) => {
          if (i.id === action.payload) {
            i.count -= 1;
          }
        });
        return;
      } else {
        return;
      }
    },
    add: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      } else {
        state.items.map((i) => {
          if (i.id === action.payload) {
            i.count += 1;
          } else {
            return i;
          }
        });
      }
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
