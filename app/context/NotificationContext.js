// NotificationContext.js
import React, { createContext, useState, useContext } from "react";
import { ToastNotification } from "@carbon/react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (
    message,
    kind = "success",
    title = "Success",
    hideTimeOut = 5000,
    caption = ""
  ) => {
    setNotification({ message, kind, hideTimeOut, caption, title });
    setTimeout(() => setNotification(null), hideTimeOut); // Hide after 5 seconds
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <ToastNotification
          kind={notification.kind}
          title={notification.title}
          subtitle={notification.message}
          caption={notification.caption}
          timeout={notification.hideTimeOut}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
