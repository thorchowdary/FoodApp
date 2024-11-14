import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import React from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { CDN_URL } from "../Utils/constants";
import UserContext from "../Utils/UserContext";
import { useContext } from "react";

const RestaurentCard = (props) => {
  const { resData } = props;

  const { name, avgRating, cuisines, costForTwo, cloudinaryImageId } =
    resData?.info;
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <div>
        <img
          className="rounded-lg"
          alt="res-logo"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
        />
      </div>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h2>{cuisines}</h2>
      <h2>{costForTwo}</h2>
      <h2>{avgRating}</h2>
    </div>
  );
};

//higher order funtion
//takes the component as input and does/ add some changes and returns the component

const RestaurantPromoted = (RestaurentCard) => {
  return (props) => {
    <div>
      <label>promoted</label>
      <RestaurentCard {...props} />
    </div>;
  };
};

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filterRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    //console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    // Optional Chaining
    setListOfRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );

  const { loggedUser, setLoggedUser } = useContext(UserContext);
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="p-6 flex flex-wrap px-10 space-x-6 items-center">
        <div className="">
          <button
            className="bg-slate-300 w-[250] rounded-md justify-center align-middle"
            onClick={() => {
              const filterRestuarent = listOfRestaurant.filter((res) => {
                return res.info.avgRating >= 5;
              });

              setListOfRestaurant(filterRestuarent);
            }}
          >
            Filter based on rating
          </button>
        </div>
        <div className="space-x-1">
          <input
            className="border-solid"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="bg-slate-300 w-[70] rounded-md mr-10"
            onClick={() => {
              {
                const filteredRestaurant = listOfRestaurant.filter((res) => {
                  return res.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                });
                setFilteredRestaurant(filteredRestaurant);
              }
            }}
          >
            Search
          </button>
        </div>
        <div>
          <input
            type="text"
            value={loggedUser}
            onChange={(e) => setLoggedUser(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap px-14">
        {filterRestaurant.map((restaurant) => (
          <Link
            className="bg-slate-100"
            to={"/restaurants/" + restaurant?.info.id}
            key={restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurantPromoted resData={restaurant} />
            ) : (
              <RestaurentCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
