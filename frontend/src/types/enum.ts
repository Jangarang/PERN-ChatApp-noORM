// Works here tho, why?
export const NotificationStatusEnum = {
  Pending: "Pending",
  Success: "Success",
  Error: "Error",
} as const;

//Huh?
export type NotificationStatusEnum = (typeof NotificationStatusEnum)[keyof typeof NotificationStatusEnum];