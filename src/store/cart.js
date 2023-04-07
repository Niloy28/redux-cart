import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
	orders: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add(state, action) {
			const existingOrder = state.orders.find(
				(order) => order.id === action.payload.id
			);

			if (existingOrder) {
				// if the order already exists, add the quantity to it.
				existingOrder.quantity++;
			} else {
				state.orders.push({
					id: action.payload.id,
					title: action.payload.title,
					description: action.payload.description,
					price: action.payload.price,
					quantity: 1,
				});
			}
			state.totalPrice += action.payload.price;
			state.totalQuantity++;
		},
		remove(state, action) {
			const existingOrder = state.orders.find(
				(order) => order.id === action.payload.id
			);

			if (existingOrder.quantity === 1) {
				state.orders = state.orders.filter(
					(order) => order.id !== action.payload.id
				);
			} else {
				existingOrder.quantity--;
			}
			state.totalPrice -= action.payload.price;
			state.totalQuantity--;
		},
		toggleCart(state) {
			state.show = !state.show;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;
