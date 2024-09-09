export const generateTime = (startTime: number, endTime: number) => {
  const time: string[] = [];
  for (let index = startTime; index <= endTime; index++) {
    for (let ind = 0; ind < 60; ind += 30) {
      const hour = index.toString().padStart(2, "0");
      const minute = ind.toString().padEnd(2, "0");
      time.push(`${hour}:${minute}`);
    }
  }

  return time;
};
