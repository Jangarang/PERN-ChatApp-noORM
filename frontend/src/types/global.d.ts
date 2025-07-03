import 'axios';
//This doesn't work?
// export const NotificationStatusEnum = {
//   Pending: "Pending",
//   Success: "Success",
//   Error: "Error",
// } as const;

// //Huh?
// export type NotificationStatusEnum = (typeof NotificationStatusEnum)[keyof typeof NotificationStatusEnum];

export interface NotificationType {
    status: NotificationStatusEnum | null,
    title: string | null, 
    message: string | null,
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorContext?: string; // ✅ add your custom field here
  }
}