import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Stage1 from "../pages/Stage1";
import Stage2 from "../pages/Stage2";
import Stage3 from "../pages/Stage3";
import Success from "../pages/Success";
import { useContext } from "react";
import { StateMangerContext } from "../context/StateContext";

function Registerroutes() {
  const { stageCompleted } = useContext(StateMangerContext);
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Stage1 />} />
        <Route
          path="stage-2"
          element={
            stageCompleted.stage1 ? <Stage2 /> : <Navigate to={"/register"} />
          }
        />
        <Route
          path="stage-3"
          element={
            stageCompleted.stage2 ? <Stage3 /> : <Navigate to={"/register"} />
          }
        />
        <Route path="success"  element={
            stageCompleted.stage3 ? <Success /> : <Navigate to={"/register"} />
          } />
      </Route>
    </Routes>
  );
}

export default Registerroutes;
