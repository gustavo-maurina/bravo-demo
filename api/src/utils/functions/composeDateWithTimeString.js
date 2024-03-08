export function composeDateWithTimeString(date, time) {
  const currentDate = new Date(date);
  const [hours, minutes, seconds] = time.split(":");

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(seconds);
  
  return currentDate;
};
