import { useState, useEffect, useRef } from "react";
import styles from "./Weather.module.css";

const DEG_ICON = "°";
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

function Weatehr({ minTemp, maxTemp, temp, icon, desc, dt, loc }) {
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(0);

  const unixToReal = (dt) => {
    const real = new Date(dt * 1000);
    setDay(dayList[real.getDay()]); // 0 - 6(Sun - Sat)
    setMonth(monthList[real.getMonth()]); // 1 - 12(Jan - Dec)
    setDate(real.getDate()); // 1 - 31
  };

  useEffect(() => {
    unixToReal(dt);
  });

  return (
    <div className={styles.container}>
      <div className={styles.temp_wrapper}>
        <div className={styles.cur_temp}>
          {temp}
          {DEG_ICON}
        </div>
        <div className={styles.minmax_temp_wrapper}>
          <div className={styles.min_temp}>
            최저: {minTemp}
            {DEG_ICON}
          </div>
          <div className={styles.max_temp}>
            최고: {maxTemp}
            {DEG_ICON}
          </div>
        </div>
      </div>
      <div className={styles.icon_wrapper}>
        <img
          className={styles.icon}
          src={process.env.PUBLIC_URL + iconTransList[`i${icon}`]}
        />
        <div className={styles.desc}>{desc}</div>
      </div>
      <div className={styles.desc_wrapper}>{loc}</div>
      <div className={styles.date_wrapper}>
        {date}&nbsp;{month},{day}
      </div>
    </div>
  );
}

export default Weatehr;