import React from "react";
import Sleeping from "../../../images/sleeping.jpg";

const NotFound = () => {
  return (
    <div>
      <h2 className="text-primary text-center">Mechanic is Sleeping</h2>
      <img className="w-100" src={Sleeping} alt="" />
    </div>
  );
};

export default NotFound;
