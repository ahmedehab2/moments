import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

export default function MasonaryLayout({ pins }) {
  const Bp = {
    default: 4,
    3000: 6,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <Masonry className="flex gap-3 mt-5 animate-slide-in" breakpointCols={Bp}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
}
