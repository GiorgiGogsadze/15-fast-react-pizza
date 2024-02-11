import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
export default function UpdateOrde() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  await updateOrder(params.orderID, { priority: true });
  return null;
}
