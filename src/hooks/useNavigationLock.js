import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useNavigationLock = (isLocked = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLocked) return;
    const currentPath = location.pathname;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e) => {
      window.history.pushState(null, "", window.location.href);
      alert("Please use the Next/Previous buttons to navigate between stages");
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLocked, location.pathname]);
};
