import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePath() {
  const [pageName, setPageName] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setPageName("Dashboard");
        break;
      case "/dashboard/create":
        setPageName("Add Guest");
        break;
      case "/dashboard/profile":
        setPageName("Profile");
        break;
      default:
        setPageName("");
    }
  }, [location.pathname]);
  return pageName;
}
