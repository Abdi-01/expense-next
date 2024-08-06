"use client";
import * as React from "react";
import { UserContextType, UserType } from "./types";
import { apiCall } from "@/helper/axiosInstance";

// Create context with default value
export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FunctionComponent<IUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(null);

  const keepLogin = async () => {
    try {
      const { data } = await apiCall.get("/auth/keeplogin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });

      localStorage.setItem("auth", data.result.token);
      setUser({ email: data.result.email, noTelp: data.result.noTelp });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("auth")) {
      keepLogin();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
