import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Cart from "./components/Cart";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import RestaurentMenu from "./components/RestaurentMenu";
import UserContext from "./Utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";

const AppLayout = () => {
  const [userName, setLoggedUser] = useState();

  useEffect(() => {
    const data = {
      userName: "Tharun",
    };
    setLoggedUser(data.userName);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedUser: userName, setLoggedUser }}>
        <div className="App">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurentMenu />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/home",
        element: <Body />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
