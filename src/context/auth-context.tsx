import { createContext, useEffect, useState } from "react";
import { R_TOKEN } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  userEmail: string | null;
  userName: string | null;
  token: string | null;
  logout: () => void;
  setUserName: (value: string) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(R_TOKEN)
  );
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("user_name") || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decode: {
          email: string;
          name: string;
        } = jwtDecode(token);

        setUserEmail(decode.email);

        if (!localStorage.getItem("user_name")) {
          setUserName(decode.name);
          localStorage.setItem("user_name", decode.name);
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem(R_TOKEN);
    localStorage.removeItem("user_data");
    setToken(null);
    setUserEmail(null);
    setUserName(null);
    navigate("/auth/sign-in");
  };

  const updateUserName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem("user_name", newName);
  };

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        token,
        logout,
        userName,
        setUserName: updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
