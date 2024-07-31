import React, { createContext, useState } from "react";
import { usersData } from "../data/usersData";

export const UsersDataContext = createContext();

export default function UsersDataProvider({ children }) {
  const [users, setUsers] = useState(usersData);

  return (
    <UsersDataContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersDataContext.Provider>
  );
}
