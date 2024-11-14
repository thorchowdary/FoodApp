import { useState } from "react";
import ItemList from "./ItemList";

const RestaurentItems = ({ data, showItems, setShowIndex }) => {
  const resInfo = data?.card?.card;

  const handleClick = () => {
    // Toggle the visibility of the accordion section
    setShowIndex();
  };

  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 space-x-10">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {resInfo.title} ({resInfo.itemCards.length})
        </span>
        <span>{showItems ? "⬆️" : "⬇️"}</span>{" "}
        {/* Toggle icon based on state */}
      </div>
      {showItems && (
        <div>
          {resInfo.itemCards.map((item, index) => (
            <ItemList key={index} items={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurentItems;
