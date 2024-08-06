"use client";
import * as React from "react";
import { UserContextType, UserType } from "./types";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
