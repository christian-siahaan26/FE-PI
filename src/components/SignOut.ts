import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { R_TOKEN } from "@/utils/constants";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    console.warn("Logging out...");

    if (localStorage.getItem(R_TOKEN)) {
      localStorage.removeItem(R_TOKEN);
      localStorage.removeItem("currentPage");
      localStorage.removeItem("user_data");
      localStorage.removeItem("user_name");
    }

    navigate("/auth/sign-in", { replace: true });
  }, [navigate]);

  return logout;
};

export default useLogout;
