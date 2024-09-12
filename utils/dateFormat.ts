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
