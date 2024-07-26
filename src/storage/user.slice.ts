import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { LoginResponse } from "../Interfaces/auth.interface";

export const JWT_KEY = "userData";

export interface UserPersistantState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: "rejected";
}

const initialState: UserState = {
  jwt: loadState<UserPersistantState>(JWT_KEY)?.jwt ?? null,
};

// исползуем createAsyncThunk, чтобы была вомзожность использовать асинхронный reducer
export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  // используем extraReducers, чтобы обработать состояние login, так как там async функция, то соответственно
  // возвращаться будет promise, а раз так, то его, конечно, нужно обработать, а именно
  // на его конкретное состояние добавить функцию, которая при факте этого состояния будет вызываться
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      } else {
        state.jwt = action.payload.access_token;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
