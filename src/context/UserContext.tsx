"use client";
import * as React from "react";
import { UserContextType, UserType } from "./types";
import { apiCall } from "@/helper/axiosInstance";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = React.useState<UserType | null>(null);

  const [onCheck, setOnCheck] = React.useState<boolean>(true);

  React.useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
