import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./containers/Home";
import { Login } from "./components";
import { fetchUser } from "./utils/fetchLocalUser";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User = fetchUser();

    if (!User) navigate("/login");
  }, []);
  return (
    <Routes>
      <Route path="/*" element={<Home />} />

      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
