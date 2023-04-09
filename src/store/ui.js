import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
	showCart: false, // show cart or not, default to false.
	notification: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleCartDisplay(state) {
			state.showCart = !state.showCart;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
