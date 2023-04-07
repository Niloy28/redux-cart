import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
	const { id, title, price, description } = props;

	const cartDispatch = useDispatch();

	const addToCartHandler = () => {
		cartDispatch(cartActions.add({ id, title, description, price }));
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
