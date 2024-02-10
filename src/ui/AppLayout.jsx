import Header from "./Header";
import CartOverwiew from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <main className="noScroll mx-auto w-full overflow-y-scroll p-1 sm:w-3/4 sm:p-2 lg:w-1/2">
        <Outlet />
      </main>
      <CartOverwiew />
    </div>
  );
}
