import { useSelector } from "react-redux";
import Button from "./Button";
import CreateUser from "../features/user/CreateUser";
function Home() {
  const userName = useSelector((store) => store.user.userName);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName ? (
        <Button type="primary" to="/menu">
          Go To Menu
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
