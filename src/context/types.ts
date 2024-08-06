// Context config

export type UserType = {
  email: string;
  noTelp?: string;
};

export interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}
