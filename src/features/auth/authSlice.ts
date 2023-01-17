import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

import { LoginResponse, User } from "../../lib/__generated__/graphql";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
// Define a type for the slice state
interface AuthState {
	access_token: string;
	refresh_token: string;
	user: User | null;
}

// Define the initial state using that type
const initialState: AuthState = {
	access_token: "",
	refresh_token: "",
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setAuth: (state, { payload }: PayloadAction<LoginResponse>) => {
			setCookie("access_token", payload.access_token, {
				sameSite: true,
				secure: true,
			});
			setCookie("refresh_token", payload.refresh_token, {
				sameSite: true,
				secure: true,
			});

			state.access_token = payload.access_token;
			state.refresh_token = payload.refresh_token;
			state.user = payload.user;
		},
		setAccessToken: (state, { payload }: PayloadAction<string>) => {
			setCookie("access_token", payload, {
				httpOnly: true,
				sameSite: true,
			});

			state.access_token = payload;
		},
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.user = payload;
		},
		clearAuth: (state) => {
			deleteCookie("access_token");
			deleteCookie("refresh_token");

			state = initialState;
		},
	},
});

export const { setAuth, setUser, setAccessToken, clearAuth } =
	authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
