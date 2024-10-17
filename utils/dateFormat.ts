import { differenceInDays, isBefore } from "date-fns";

export function combineDateAndTime(timestamp: string, timeOfDay: string) {
  // Extract date part (YYYY-MM-DD) from the timestamp
  const datePart = timestamp.split("T")[0];

  // Combine the date with the provided time of day
  const combinedDateTime = `${datePart}T${timeOfDay}`;
  // Create the new Date object
  const dateObject = new Date(combinedDateTime);

  // Format the time to a human-readable format (12-hour clock with AM/PM)
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
}

export function getNumberOfDays(
  pickupDate: Date,
  pickupTime: string,
  returnDate: Date,
  returnTime: string
): number {
  if (!pickupDate || !returnDate) return 0;
  const pickupD = pickupDate.toISOString().split("T")[0];
  const returnD = returnDate.toISOString().split("T")[0];

  // Combine the date with the provided time of day
  const pickupDateTime = `${pickupD}T${pickupTime}`;
  const returnDateTime = `${returnD}T${returnTime}`;

  // Create the new Date object
  const pickupdateObject = new Date(pickupDateTime);
  const returnDateObject = new Date(returnDateTime);

  console.log(pickupdateObject);
  console.log(returnDateObject);

  const diff = differenceInDays(returnDateObject, pickupdateObject);
  console.log(diff);
  return diff;
}

export const isPastDate = (date: Date, time: string) => {
  const d = date.toISOString().split("T")[0];
  const now = Date.now();
  const givenDate = new Date(`${d}T${time}`);
  return isBefore(givenDate, now);
};


