import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartOrders = useSelector((state) => state.cart.orders);

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				{cartOrders.map((order) => (
					<CartItem
						key={order.id}
						item={{
							id: order.id,
							title: order.title,
							quantity: order.quantity,
							total: order.price * order.quantity,
							price: order.price,
						}}
					/>
				))}
			</ul>
		</Card>
	);
};

export default Cart;
