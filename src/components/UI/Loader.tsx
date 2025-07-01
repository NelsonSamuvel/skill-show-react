import React from "react";
import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40">
      <Spinner />
    </div>
  );
};

export default Loader;
