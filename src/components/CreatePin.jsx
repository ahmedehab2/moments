import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { categories } from "../utils/data";

export default function CreatePin({ user }) {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/svg" ||
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/jpg"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((err) => console.log("image upload error", err));
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => navigate("/"));
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:h-4/5 mt-5">
      {fields && <p className="text-xl text-red-700">please fill all fields</p>}
      <div className="flex lg:flex-row flex-col items justify-center bg-white lg:p-5 lg:w-5/6 p-3 w-full">
        <div className="bg-gray-100 flex p-3 w-full lg:w-1/2">
          <div className="flex justify-center items-center flex-col border-dotted border-2 border-gray-300 p-3 w-full h-full">
            {loading && <Circles color="#000" width={30} />}

            {wrongImageType && <p className="text-red-500">wrong image type</p>}

            {!imageAsset ? (
              <label>
                <div className="h-full">
                  <div className="flex flex-col items-center justify-center ">
                    <AiOutlineCloudUpload size={25} />
                    <p className="font-semibold">Upload your Pin</p>
                    <p className="mt-5 text-gray-400">Use High quality Image</p>
                  </div>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  className="w-0 h-0"
                  onChange={uploadImage}
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploadedImage"
                  className="h-full w-full"
                />
                <button
                  className="rounded-full p-1 bg-gray-300 flex items-center absolute bottom-2 right-2"
                  onClick={() => setImageAsset(null)}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:pl-5 mt-5 w-full">
          <input
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-b-gray-500"
            type="text"
            value={title}
            name="title"
            placeholder="Add title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-b-gray-500"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-b-gray-500"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black "
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-gray-500 text-white font-semibold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
