import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTime(date: Date, timeStr: string): string {
  // Extract hours and minutes from the timeStr
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Create a new Date object with the given date and time
  const dt = new Date(date);
  dt.setHours(hours, minutes);

  // Convert to 12-hour format
  return dt
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/^0/, "");
}
