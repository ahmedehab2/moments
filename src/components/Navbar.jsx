import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";

export default function Navbar({ searchTerm, setSearchTerm, user }) {
  if (!user) return;
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 w-full lg:mx-auto mt-10">
      <div className="flex items-center  w-full bg-white rounded-xl shadow-md focus-within:shadow-lg">
        <BiSearch size={20} className="mx-3" />
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => navigate("/search")}
          className="outline-none p-2 w-full rounded-xl"
        />
      </div>
      <div className="flex gap-2">
        <Link to={`user/${user?._id}`}>
          <img
            className="w-14 rounded-full hidden md:block"
            src={user.image}
            alt="user-picture"
            title={`${user.userName}`}
            referrerPolicy="no-referrer"
          />
        </Link>
        <Link
          to="createPin"
          className="bg-black p-2 grid h-12 w-12 self-center place-content-center rounded-full hover:bg-gray-600"
          title="create pin"
        >
          <IoAdd color="white" size={20} />
        </Link>
      </div>
    </div>
  );
}
