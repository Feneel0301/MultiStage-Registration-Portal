import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Registerroutes from "../routes/Registerroutes";

function IndexRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/*" element={<Registerroutes />} />
      <Route path="/*" element={<Navigate to="/register/stage-1" />} />
    </Routes>
  );
}

export default IndexRoute;
