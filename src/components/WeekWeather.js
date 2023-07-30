import { useState, useEffect } from "react";
import styles from "./WeekWeather.module.css";

const DEG_ICON = "°";
const iconTransList = {
  i11d : "/cloud/12.png",
  i09d : "/cloud/7.png",
  i10d : "/sun/8.png",
  i13d : "/cloud/18.png",
  i50d : "/cloud/5.png",
  i01d : "/sun/26.png",
  i01n : "/moon/10.png",
  i02d : "/sun/27.png",
  i02n : "/moon/15.png",
  i03d : "/sun/4.png",
  i03n : "/moon/14.png",
  i04d : "/sun/13.png",
  i04n : "/moon/41.png",
}

function WeekWeather({ month, day, date, maxTemp, minTemp, icon }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon_wrapper}>
        <img
          src={process.env.PUBLIC_URL + iconTransList[`i${icon}`]}
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
