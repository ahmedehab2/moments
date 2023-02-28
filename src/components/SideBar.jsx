import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-dark.png";
import { categories } from "../utils/data";
import { FcCamera } from "react-icons/fc";
import { MdHome } from "react-icons/md";

const sideBar = ({ user, handleToggle }) => {
  const activeClass =
    "flex font-bold underline items-center gap-2 border-r-2 text-gray-700 border-[#0d0730]";
  const notActiveClass =
    "flex  items-center gap-2 hover:underline text-gray-500";

  return (
    <div className="flex flex-col w-full text-[#0d0730]">
      <Link className="flex items-center mx-auto" to="/" onClick={handleToggle}>
        <FcCamera size={30} />
        <img className="w-32" src={logo} alt="moments" />
      </Link>
      <div className="flex flex-col my-3 ml-5">
        <NavLink
          className={({ isActive }) =>
            isActive ? activeClass : notActiveClass
          }
          to="/"
          end
          onClick={handleToggle}
        >
          <MdHome />
          Home
        </NavLink>
      </div>
      <div className="flex flex-col gap-2 ml-5">
        <h3 className="font-bold text-xl">Discove Categories</h3>
        {categories.map((category) => (
          <NavLink
            key={category.name}
            to={`category/${category.name}`}
            className={({ isActive }) =>
              isActive ? activeClass : notActiveClass
            }
            onClick={handleToggle}
          >
            <img
              src={category.image}
              alt="categoryImg"
              className="w-9 h-9 rounded-full"
            />
            {category.name}
          </NavLink>
        ))}
      </div>
      {user && (
        <Link
          className="flex items-center ml-4 mt-10 mb-3 gap-2"
          to={`/user/${user._id}`}
        >
          <img
            className="w-12 rounded-full"
            src={user.image}
            alt="user-picture"
            referrerPolicy="no-referrer"
          />
          <p className="text-lg font-normal">{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default sideBar;
