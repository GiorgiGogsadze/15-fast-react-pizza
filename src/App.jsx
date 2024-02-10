import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import NotFound from "./ui/NotFound";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <NotFound />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <NotFound />,
      },
      {
        path: "order/:orderID",
        element: <Order />,
        loader: orderLoader,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
