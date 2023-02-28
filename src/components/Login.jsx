import React from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { json, useNavigate } from "react-router-dom";

// import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import jwt_decode from "jwt-decode";
import { client } from "../client";

export default function Login() {
  const Navigate = useNavigate();

  const responseGoogle = (response) => {
    const user_obj = jwt_decode(response.credential);
    const { name, picture, sub } = user_obj;
    localStorage.setItem("user", JSON.stringify(user_obj));
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => Navigate("/"));
  };

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
    >
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-black bg-[url('./assets/moving-bg.svg')] bg-no-repeat bg-cover bg-center">
        <img src={logo} alt="logo" width="250px" />
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>
    </GoogleOAuthProvider>
  );
}
