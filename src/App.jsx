import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCartToDB, fetchCartFromDB } from "./store/cart";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitialLoad = true;

const DB_URL =
	"https://react-http-60166-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

function App() {
	const showCart = useSelector((state) => state.ui.showCart);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isInitialLoad) {
			isInitialLoad = false;
			dispatch(fetchCartFromDB());
			return;
		}

		if (cart.changed) {
			dispatch(saveCartToDB(cart));
		}
	}, [cart, dispatch]);

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
