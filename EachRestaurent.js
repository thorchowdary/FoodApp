import React from "react";
import Shimmer from "./Shimmer";
import useEachRestaurentMenu from "../Utils/useEachRestaurent";
const EachRestaurent = (props) => {
  const { resId } = props;
  const restaurant = useEachRestaurentMenu(resId);
  if (restaurant === null) return <Shimmer />;
  const {
    name,
    city,
    areaName,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
    sla,
    feeDetails,
  } = restaurant?.cards[2]?.card?.card?.info;

  return (
    <div className="bg-gray-100 border-b-4 text-left  shadow-xl w-auto mx-[200] rounded-lg ">
      <div>
        <h1 className="text-lg font-bold">{name}</h1>
      </div>
      <div>
        <h3 className="font-bold">
          {avgRatingString}({totalRatingsString})-{costForTwoMessage}
        </h3>
      </div>
      <div className="font-bold">Outlet : {areaName}</div>
      <div>{sla?.deliveryTime} mins deliveryTime</div>
      <div>{feeDetails?.message}</div>
    </div>
  );
};

export default EachRestaurent;
