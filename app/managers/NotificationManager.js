// NotificationManager.js
import React, { useState, useEffect } from "react";
import { ToastNotification } from "@carbon/react";

let globalShowNotification;

export const NotificationManager = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    globalShowNotification = (
      message,
      kind = "success",
      title = "Success",
      hideTimeOut = 5000,
      caption = ""
    ) => {
      setNotification({ message, kind, hideTimeOut, caption, title });
      setTimeout(() => setNotification(null), hideTimeOut);
    };
  }, []);

  return (
    <>
      {notification && (
        <ToastNotification
          kind={notification.kind}
          title={notification.title}
          subtitle={notification.message}
          caption={notification.caption}
          timeout={notification.hideTimeOut}
        />
      )}
    </>
  );
};

export const showNotification = (
  message,
  kind,
  title,
  hideTimeOut,
  caption
) => {
  if (globalShowNotification) {
    globalShowNotification(message, kind, title, hideTimeOut, caption);
  }
};
