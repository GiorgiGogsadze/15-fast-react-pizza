import { createSelector, createSlice } from "@reduxjs/toolkit";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 1,
    name: "Margherita",
    quantity: 1,
    unitPrice: 12,
    totalPrice: 12,
  },
];

const initialState = {
  cart: fakeCart,
  // cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = {pizzaId, name, quantity, unitPrice, totalPrice}
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = {pizzaId}
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    incItemQuantity(state, action) {
      // payload = {pizzaId}
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice += item.unitPrice;
    },
    decItemQuantity(state, action) {
      // payload = {pizzaId}
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice -= item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartStats = createSelector(
  [(store) => store.cart.cart],
  (cart) =>
    cart.reduce(
      (acc, el) => {
        return {
          totalCartQuantity: acc.totalCartQuantity + el.quantity,
          totalCartPrice: acc.totalCartPrice + el.totalPrice,
        };
      },
      { totalCartQuantity: 0, totalCartPrice: 0 },
    ),
);

export const getCart = (state) => state.cart.cart;
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((el) => el.pizzaId === id)?.quantity || 0;
