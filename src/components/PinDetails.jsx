import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { client, urlFor } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import { pinDetailQuery, pinDetailMorePinQuery } from "../utils/data";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Spinner from "./Spinner";
import { TailSpin } from "react-loader-spinner";

export default function pinDetails({ user }) {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [addingComment, setAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((similarPins) => setPins(similarPins));
        }
      });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: v4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) return <Spinner />;

  return (
    <>
      <div className="flex lg:flex-row flex-col m-auto bg-white rounded-[30px] lg:max-w-7xl mt-10">
        <div className="max-w-lg lg:max-h-96 flex justify-center items-center md:items-start flex-intial m-10">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image)}
            alt="pinImage"
            className="rounded-3xl h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-full p-5 flex-1 relative">
          <div className="flex items-center justify-between">
            <a
              href={`${pinDetail.image.asset.url}?dl=`}
              className="p-1 bg-gray-200 flex rounded-full"
              download
            >
              <AiOutlineCloudDownload size={30} />
            </a>
            <a
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gray-200 px-2"
            >
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-3xl mt-5 break-words">{pinDetail.title}</h1>
            <p className="text-xl mt-5">{pinDetail.about}</p>
          </div>
          <Link
            className="flex items-center gap-2 mt-5"
            to={`/user/${user._id}`}
          >
            <img
              className="w-10 rounded-full"
              src={pinDetail.postedBy.image}
              alt="user-picture"
            />
            <p className="text-lg font-normal">{pinDetail.postedBy.userName}</p>
          </Link>
          <h2 className="text-2xl mt-5">Comments</h2>
          <div className="overflow-y-auto max-h-56">
            {pinDetail.comments?.map((comment) => (
              <div className="flex gap-2 bg-white mt-5 items-centers">
                <img
                  src={comment.postedBy.image}
                  referrerPolicy="no-referrer"
                  alt="userProfile"
                  className="w-10 h-10 rounded-xl"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5 items-center">
            <Link className="flex items-center gap-2" to={`/user/${user._id}`}>
              <img
                className="w-8 rounded-full"
                src={user.image}
                alt="user-picture"
                referrerPolicy="no-referrer"
              />
            </Link>
            <input
              type="text"
              value={comment}
              name="comment"
              className="outline-none text-base sm:text-lg border-2 border-gray-100 p-1 focus:border-gray-200 rounded-lg"
              placeholder="Add a comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? (
                <TailSpin width={20} height={10} color="#000" />
              ) : (
                "post"
              )}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-4xl font-semibold text-center my-8 ">
            More like this
          </h2>
          <MasonaryLayout pins={pins} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
