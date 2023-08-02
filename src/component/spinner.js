import React from 'react';
import {FadeLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div className="w-100 h-screen grid place-items-center">
      <FadeLoader color="black" />
    </div>
  );
};

export default Spinner;
