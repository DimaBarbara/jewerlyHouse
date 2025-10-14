import { useParams } from "react-router-dom";
import { useFindByCategoryQuery } from "../../redux/items/ItemApi";
import Item from "./Item";
import { SyncLoader } from "react-spinners";

const ItemList = () => {
  const { category } = useParams<{ category: string }>();
  const cat = category || "all";
  const { data: items = [], error, isLoading } = useFindByCategoryQuery(cat);

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
      <div className="flex flex-col items-center mx-auto ">
        <h2 className="text-red-700">{errorMessage}</h2>
        <button
          className="border rounded-md !p-2"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
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
    <div className="grid grid-cols-4 gap-5 ">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
