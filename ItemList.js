import { CDN_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../Utils/cartSlice";
const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };
  return (
    <div
      data-testid="foodItems"
      key={items.card.info.id}
      className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
    >
      <div className="w-9/12">
        <div className="py-2">
          <span>{items.card.info.name}</span>
          <span>
            - ₹
            {items.card.info.price
              ? items.card.info.price / 100
              : items.card.info.defaultPrice / 100}
          </span>
        </div>
        <p className="text-xs">{items.card.info.description}</p>
      </div>
      <img
        src={CDN_URL + items?.card?.info?.imageId}
        className="w-full size-7"
      />
      <div>
        <button
          onClick={() => handleAddItem(items)}
          className="bg-slate-500 text-blue-50 w-14 mr-10 rounded-xl align-middle justify-center"
        >
          +Add
        </button>
      </div>
    </div>
  );
};

export default ItemList;
