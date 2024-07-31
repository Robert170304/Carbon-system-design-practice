"use client";

import { Content, Theme } from "@carbon/react";
import HeaderCompo from "../components/Header/HeaderCompo";
import UsersDataProvider from "./context/UsersDataContext";

export function Providers({ children }) {
  return (
    <UsersDataProvider>
      <div>
        <Theme theme="g100">
          <HeaderCompo />
        </Theme>
        <Content>{children}</Content>
      </div>
    </UsersDataProvider>
  );
}
