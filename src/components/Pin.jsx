import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { urlFor, client } from "../client";
import { v4 } from "uuid";
import {
  AiOutlineCloudDownload,
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { fetchUser } from "../utils/fetchLocalUser";

export default function Pin({ pin: { postedBy, image, _id, save } }) {
  const user = fetchUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(
    () => !!save?.filter((item) => item?.postedBy?._id === user?.sub)?.length //sub=googleID
  );

  const savePin = (pinId) => {
    if (!saved) {
      setSaved(true);
      client
        .patch(pinId)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: v4(), //uuid
            userId: user?.sub,
            postedBy: { _ref: user?.sub, _type: "postedBy" },
          },
        ])
        .commit()
        .catch(() => {
          setSaved(false);
        });
    }
  };

  const unSavePin = (pinId) => {
    client
      .patch(pinId)
      .unset([`save[userId=="${user?.sub}"]`])
      .commit()
      .then(() => {
        setSaved(false);
      });
  };

  const deletePin = (id) => {
    client.delete(id).then(() => window.location.reload());
  };

  return (
    <div className="m-2">
      <div className="relative" onClick={() => navigate(`/pinDetails/${_id}`)}>
        <img
          src={urlFor(image).url()}
          alt="pin"
          className="rounded-xl w-full"
          loading="lazy"
        />
        <div className="w-full h-full flex flex-col justify-between opacity-0 hover:opacity-100 transition-all duration-300 rounded-xl inset-0 absolute backdrop-blur-sm bg-white/30 p-4">
          <div className="flex justify-between items-center">
            {saved ? (
              <button
                className="rounded-full p-1 bg-gray-300 flex items-center"
                onClick={(e) => {
                  unSavePin(_id);
                  e.stopPropagation();
                }}
              >
                <AiFillHeart size={20} />
                {save?.length > 0 && save.length}
              </button>
            ) : (
              <button
                className="rounded-full p-1 bg-gray-200 flex items-center"
                onClick={(e) => {
                  savePin(_id);
                  e.stopPropagation();
                }}
              >
                <AiOutlineHeart size={20} />
                {save?.length > 0 && save.length}
              </button>
            )}
            <a
              href={`${image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="p-1 bg-gray-200 flex rounded-full"
            >
              <AiOutlineCloudDownload size={20} />
            </a>
          </div>
          {postedBy._id === user?.sub && (
            <button
              className="rounded-full p-1 bg-gray-200 self-end"
              onClick={(e) => {
                e.stopPropagation();
                deletePin(_id);
              }}
            >
              <AiOutlineDelete size={20} />
            </button>
          )}
        </div>
      </div>
      <Link
        to={`/user/${postedBy?._id}`}
        className="p-2 flex gap-2 items-center"
      >
        <img
          className="w-8 rounded-full"
          src={postedBy.image}
          alt="user-picture"
          referrerPolicy="no-referrer"
        />
        <p className="text-sm">{postedBy.userName}</p>
      </Link>
    </div>
  );
}
