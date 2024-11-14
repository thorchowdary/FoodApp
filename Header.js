import { useContext, useState } from "react";
import { LOGO_URL } from "../Utils/constants";
import { Link } from "react-router-dom";
import React from "react";
import About from "./About";
import { useSelector } from "react-redux";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/UserContext";

const Header = () => {
  const [buttonName, setButtonName] = useState("login");
  const onlineStatus = useOnlineStatus();
  const { loggedUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="mt-3 flex flex-wrap justify-between bg-slate-300 border shadow-2xl">
      <div className="w-[120]">
        <img src={LOGO_URL} />
      </div>
      <div className="">
        <ul className="px-10 m-10 flex flex-wrap space-x-8 justify-self-end text-xl Bold font-bold">
          <li className="">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className="button"
            onClick={() => {
              buttonName == "login"
                ? setButtonName("logout")
                : setButtonName("login");
            }}
          >
            {buttonName}
          </button>
          <li className="px-4">{loggedUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
