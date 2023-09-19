import "./App.css";
import { useState, useEffect } from "react";
import { convertToUTC } from "./secondaryFn";

function App() {
  const [time, setTime] = useState("10:00");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [inputType, setInputType] = useState("time");
  const maxHours = 23;
  const maxMinutes = 59;

  useEffect(() => {
    const tempInput = document.createElement("input");
    tempInput.setAttribute("type", "time");

    if (!tempInput.type === "time") {
      setInputType("text");
    } 
  }, []);

  const validInput = (val) => {
    return val.replace(/[^0-9]+/g, "");
  };

  const handleInputFocus = (e) => {
    if (inputType === "text") {
      if (e.target.value === "10:00") {
        e.target.value = "";
      }
    }
  };

  const handleInputChange = (e) => {
    let val = e.target.value;

    // Очищаем значение от всего, кроме цифр
    val = validInput(val);

    let formattedValue = "";
    if (val.length <= 2) {
      const hours = val.substring(0, 2);
      formattedValue = hours;
    } else {
      const hours = val.substring(0, 2);
      const minutes = val.substring(2, 4);
      formattedValue = `${hours}:${minutes}`;
    }

    if (formattedValue) {
      const [hours, minutes] = formattedValue.split(":").map(Number);
      if (hours > maxHours || minutes > maxMinutes) {
        setIsError(true);
        setError(`Не правильный формат времени. Укажите время в формате ЧЧ:ММ`);
      } else {
        setIsError(false);
        setError("");
      }
    }

    setTime(formattedValue);
  };

  const onCancel = () => {
    window.Telegram.WebApp.close();
  };

  const onSave = (timeValue) => {
    if (isError) {
      return alert("Не валидные данные");
    }
    if (time.length < 5) {
      return alert("Нужно указать время в формате ЧЧ:ММ");
    }
    const timeValueUTC = convertToUTC(timeValue);
    window.Telegram.WebApp.sendData(`${timeValue}|${timeValueUTC}`);
  };

  return (
    <div className="container">
      <h3>⏳</h3>
      <input
        type={inputType}
        value={time}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
      />
      {isError && (
        <div className="error" id="error">
          {error}
        </div>
      )}
      <div className="button-container">
        <button onClick={onCancel} className="button">
          Отменить
        </button>
        <button onClick={() => onSave(time)} className="button">
          Сохранить
        </button>
      </div>
    </div>
  );
}

export default App;
