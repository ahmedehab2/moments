import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Spinner({ message }) {
  return (
    <div className="w-full grid place-items-center my-40">
      <TailSpin height="50" width="50" color="#000" />
      <p>{message}</p>
    </div>
  );
}
