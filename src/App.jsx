import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

const DB_URL =
	"https://react-http-60166-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

function App() {
	const showCart = useSelector((state) => state.ui.showCart);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);
	const notificationDispatch = useDispatch();

	useEffect(() => {
		const saveCartToDB = async () => {
			notificationDispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data!",
				})
			);
			const response = await fetch(DB_URL, {
				method: "PUT",
				body: JSON.stringify(cart),
			});

			if (!response.ok) {
				throw new Error("Sending cart data failed!");
			}

			notificationDispatch(
				uiActions.showNotification({
					status: "success",
					title: "Sent",
					message: "Successfully sent cart data!",
				})
			);
		};

		saveCartToDB().catch((error) => {
			notificationDispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed!",
				})
			);
		});
	}, [cart]);

	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
