import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Progressbar from "../components/Progressbar";
import { useContext, useEffect, useState } from "react";
import progressColors from "../config/progressColors";
import { StateMangerContext } from "../context/StateContext";

function DashboardLayout() {
  const { formData, calculateProgress } = useContext(StateMangerContext);
  const [progress, setProgress] = useState(0);

  // Recalculate progress whenever formData changes
  useEffect(() => {
    const newProgress = calculateProgress();
    setProgress(newProgress);
  }, [formData, calculateProgress]);

  const progressColor =
    progressColors.find((rule) => progress >= rule.min && progress <= rule.max)
      ?.color || "bg-gray-400";

  return (
    <>
      <Header />

      <div className="pt-20"></div>

      <div className="max-w-2xl mx-auto mb-8">
        <Progressbar progress={progress} color={progressColor} />
      </div>

      <Outlet />
    </>
  );
}

export default DashboardLayout;