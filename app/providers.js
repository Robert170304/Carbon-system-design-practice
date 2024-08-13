"use client";

import { Content, Theme } from "@carbon/react";
import HeaderCompo from "../components/Header/HeaderCompo";
import { NotificationManager } from "./managers/NotificationManager";

export function Providers({ children }) {
  return (
    <div>
      <Theme theme="g100">
        <HeaderCompo />
      </Theme>
      <NotificationManager />
      <Content>{children}</Content>
    </div>
  );
}
