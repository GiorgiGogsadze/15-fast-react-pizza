import { formatCurrency } from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice.js";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const isInCart = useSelector((state) =>
    state.cart.cart.some((el) => el.pizzaId === id),
  );

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {soldOut || isInCart ? null : (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
          {isInCart ? <UpdateItemQuantity pizzaId={id} /> : null}
          {isInCart ? <DeleteItem pizzaId={id} /> : null}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
