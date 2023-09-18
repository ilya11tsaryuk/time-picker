import "./App.css";
import { useState } from "react";
import { TimePicker } from "react-ios-time-picker";


function App() {
  const [value, setValue] = useState("10:00");

  const convertToUTC = (localTime) => {
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

  const onCancel = () => {
    window.Telegram.WebApp.sendData(`-`);
  };

  const onChange = (timeValue) => {
    const timeValueUTC = convertToUTC(timeValue);
    setValue(timeValue);
    window.Telegram.WebApp.sendData(`${timeValue}|${timeValueUTC}`);
  };

  return (
    <div className="container">
      <TimePicker
        inputClassName="iinnnpuuut"
        isOpen={true}
        onCancel={onCancel}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default App;
