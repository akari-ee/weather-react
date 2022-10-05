import { useState, useEffect } from "react";
import styles from "./WeekWeather.module.css";

const DEG_ICON = "°";
function WeekWeather({ month, day, date, maxTemp, minTemp, icon }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon_wrapper}>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          className={styles.icon}
        />
      </div>
      <div className={styles.temp_wrapper}>
        {maxTemp}
        {DEG_ICON}/{minTemp}
        {DEG_ICON}
      </div>
      <div className={styles.date}>
        {date}&nbsp;{month}
      </div>
      <div className={styles.day}>{day}</div>
    </div>
  );
}

export default WeekWeather;
