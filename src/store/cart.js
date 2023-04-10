import { createSlice } from "@reduxjs/toolkit/dist";
import { uiActions } from "./ui";

const initialState = {
	orders: [],
	totalQuantity: 0,
	totalPrice: 0,
	changed: false,
};

const DB_URL =
	"https://react-http-60166-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		replace(state, action) {
			state.orders = action.payload.orders;
			state.totalPrice = action.payload.totalPrice;
			state.totalQuantity = action.payload.totalQuantity;
		},
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
			state.changed = true;
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
			state.changed = true;
		},
		toggleCart(state) {
			state.show = !state.show;
		},
	},
});

export const fetchCartFromDB = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(DB_URL);

			return await response.json();
		};

		try {
			const cart = await fetchData();

			dispatch(
				cartActions.replace({
					orders: cart.orders || [],
					totalPrice: cart.totalPrice || 0,
					totalQuantity: cart.totalQuantity || 0,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};

export const saveCartToDB = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(DB_URL, {
				method: "PUT",
				body: JSON.stringify({
					orders: cart.orders,
					totalPrice: cart.totalPrice,
					totalQuantity: cart.totalQuantity,
				}),
			});

			if (!response.ok) {
				throw new Error("Sending cart data failed!");
			}
		};

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Sent",
					message: "Successfully sent cart data!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed!",
				})
			);
		}
	};
};

export const cartActions = cartSlice.actions;
export default cartSlice;
