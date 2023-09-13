import { useEffect, useState } from 'react';

export default function useNotification() {
  const [notificationPermission, setNotificationPermission] =
    useState('default');

  useEffect(() => {
    // Check if the Notification API is available
    if ('Notification' in window) {
      // Request permission to display notifications
      Notification.requestPermission()
        .then((permission) => {
          setNotificationPermission(permission);
          return permission;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const showNotification = (
    notificationTitle: string,
    notificationBody: string,
    type: 'electron' | 'browser' = 'browser'
  ) => {
    if (notificationPermission === 'granted') {
      let notification;
      switch (type) {
        case 'electron':
          window.electron.notification.send(
            notificationTitle,
            notificationBody
          );
          break;
        case 'browser':
          notification = new Notification(notificationTitle, {
            body: notificationBody,
          });
          notification.onclick = () => alert('click notification');
          break;
        default:
          break;
      }
    }
  };

  return { showNotification };
}
