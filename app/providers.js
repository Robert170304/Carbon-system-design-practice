"use client";

import { Content, Theme } from "@carbon/react";
import { NotificationManager } from "./managers/NotificationManager";
import HeaderCompo from "@/components/Header/HeaderCompo";

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
