import React from "react";
import { useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  <div>
    <h1>oops....</h1>
    <h2>Some went wrong </h2>
  </div>;
};
export default Error;
