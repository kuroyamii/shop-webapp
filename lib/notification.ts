import { NotificationInstance } from "antd/es/notification/interface";

export const openNotification = (
  api: NotificationInstance,
  message: string,
  title: string = "Notification",
  placement:
    | "bottomRight"
    | "bottomLeft"
    | "topRight"
    | "topLeft"
    | "top"
    | "bottom" = "bottomRight"
) => {
  api.open({
    message: title,
    description: message,
    placement,
  });
};
