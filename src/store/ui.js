import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
	showCart: false, // show cart or not, default to false.
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleCartDisplay(state) {
			state.showCart = !state.showCart;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
