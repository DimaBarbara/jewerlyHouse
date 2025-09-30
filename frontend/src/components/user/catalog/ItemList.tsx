import { useGetItemsQuery } from "../../../redux/items/ItemApi";
import Item from "./Item";
import { SyncLoader } from "react-spinners";

const ItemList = () => {
  const { data: items = [], error, isLoading } = useGetItemsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    let errorMessage = "An unknown error occurred.";
    if ("status" in error) {
      errorMessage = `Error ${error.status}: Failed to load products.`;
    } else {
      errorMessage = `Connection problem: ${error.message}`;
    }

    return (
      <div className="error-state">
        <h2>{errorMessage}</h2>
        <button onClick={() => window.location.reload()}>Tyy again</button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Unfortunately, there are no products in this category.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-5">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
