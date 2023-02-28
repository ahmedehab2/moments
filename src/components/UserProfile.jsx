import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
import { fetchUser } from "../utils/fetchLocalUser";

const activeBtnStyles =
  "bg-gray-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-gray-100 mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const User = fetchUser();
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    googleLogout();
    localStorage.clear();

    navigate("/login");
  };

  if (!user) return <Spinner />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-end items-center w-full h-60 bg-[url('./assets/moving-bg.svg')] bg-no-repeat bg-center">
            <img
              className="rounded-full w-20 h-20  shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
            <div className="flex gap-5 items-end">
              <h1 className="font-bold text-3xl text-center mt-3">
                {user.userName}
              </h1>
              <div title="Logout">
                {userId === User?.sub && (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={logout}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonaryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
