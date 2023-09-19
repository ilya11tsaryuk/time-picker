export const convertToUTC = (localTime) => {
    const [hours, minutes] = localTime.split(":").map(Number);
    const localDate = new Date();
    localDate.setHours(hours);
    localDate.setMinutes(minutes);

    const timezoneOffset = localDate.getTimezoneOffset();
    localDate.setMinutes(localDate.getMinutes() + timezoneOffset);

    return `${localDate.getHours().toString().padStart(2, "0")}:${localDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };