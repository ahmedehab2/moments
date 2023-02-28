import React, { useState, useEffect } from "react";
import { Link, Route, Routes, Outlet } from "react-router-dom";
import { UserProfile, SideBar } from "../components";
import { client } from "../client";
import { userQuery } from "../utils/data";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { FcCamera } from "react-icons/fc";
import logo from "../assets/logo-dark.png";
import Pins from "./Pins";
import { fetchUser } from "../utils/fetchLocalUser";

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const toggleMenu = () => setToggle((prevState) => !prevState);
  const userInfo = fetchUser();
  //sub===googleID

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => setUser(data[0]));
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen">
      <div className="hidden md:flex h-screen flex-initial shadow-2xl w-1/6 min-w-[250px] py-5 overflow-y-auto no-scrollbar">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden justify-between p-5 items-center shadow-xl">
        <GiHamburgerMenu size={30} onClick={() => toggleMenu()} />
        <Link className="flex items-center justify-center w-40" to="/">
          <FcCamera size={25} />
          <img className="w-1/2" src={logo} alt="moments" />
        </Link>
        <Link to={`user/${user?._id}`}>
          <img
            className="w-[10vw] rounded-full"
            src={user?.image}
            alt="user-picture"
          />
        </Link>
      </div>
      {toggle && (
        <div className="fixed top-0 bg-white w-4/5 shadow-2xl overflow-y-auto z-10 h-screen animate-slide-in">
          <div className="flex items-center justify-end p-5">
            <GrClose size={20} onClick={() => toggleMenu()} />
          </div>
          <SideBar user={user && user} handleToggle={toggleMenu} />
        </div>
      )}
      <div className="flex-1 h-screen overflow-y-auto ">
        <Routes>
          <Route path="user/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}
