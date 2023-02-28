import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Search, Navbar, Feed, PinDetails, CreatePin } from "../components";
const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-3">
      <div>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>

      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="category/:categoryId" element={<Feed />} />
          <Route
            path="/pinDetails/:pinId"
            element={<PinDetails user={user} />}
          />
          <Route path="/createPin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
