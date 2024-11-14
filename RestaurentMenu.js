import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import EachRestaurent from "./EachRestaurent";
import useRestaurentManu from "../Utils/useRestaurentMenu";
import RestaurentItems from "./RestaurentItems";

const RestaurentMenu = () => {
  const { resId } = useParams();
  const restaurentMenu = useRestaurentManu(resId);
  const [showIndex, setShowIndex] = useState(null); // Tracks which section is expanded

  if (restaurentMenu === null) return <Shimmer />;

  const categories =
    restaurentMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div>
      <EachRestaurent resId={resId} />
      <div>
        {categories.map((category, index) => (
          <RestaurentItems
            key={index}
            data={category}
            showItems={index === showIndex} // Show only the selected section
            setShowIndex={() =>
              setShowIndex((prevIndex) => (prevIndex === index ? null : index))
            }
            /*
            setShowIndex is updated based on whether the clicked item is already active.
            If it is, we collapse the item by setting the active index to null.
            If it's not, we set the active index to the current index.
            */
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurentMenu;
