import React, { createContext, useMemo, useState } from "react";

export const UsersDataContext = createContext();

export default function UsersDataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const contextValue = useMemo(() => ({ users, setUsers }), [users]);

  return (
    <UsersDataContext.Provider value={contextValue}>
      {children}
    </UsersDataContext.Provider>
  );
}
