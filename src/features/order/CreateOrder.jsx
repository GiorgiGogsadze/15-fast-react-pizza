import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import { clearCart, getCart, getTotalCartStats } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
//+1 (615) 243-5172

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;
  // if everything is ok:
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return null;
}

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmiting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);

  const {
    userName,
    position,
    address,
    status: addressStatus,
    error: addressError,
  } = useSelector((store) => store.user);
  const isLoading = addressStatus === "loading";
  const isError = addressStatus === "error";

  const { totalCartPrice } = useSelector(getTotalCartStats);

  const dispatch = useDispatch();

  const finalCartPrice = withPriority
    ? totalCartPrice + Math.floor(totalCartPrice * 0.2)
    : totalCartPrice;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xt mb-8 font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              defaultValue={userName}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input min-w-24"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoading}
              required
            />
            {isError && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!address ? (
            <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoading}
              >
                Get Position
              </Button>
            </span>
          ) : null}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 checked:ring checked:ring-yellow-400 checked:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `lat:${position.latitude},lng:${position.longitude}`
              : ""
          }
        />
        <div>
          <Button disabled={isSubmiting || isLoading} type="primary">
            {isSubmiting
              ? "Placing order"
              : `Order now for ${formatCurrency(finalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
