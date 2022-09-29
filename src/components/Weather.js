import { useState, useEffect, useRef } from "react";
import styles from "./Weather.module.css"

function Weatehr({feels, minTemp, maxTemp, humid, pressure, rain, sunrise, sunset, windSpeed, icon, desc}) {
    return(
        <div className={styles.container}>
            
        </div>
    );
}

export default Weatehr;

// ! Icon Styles
// background: `url(http://openweathermap.org/img/wn/${icon}@2x.png)`,
//             width: "400px",
//             height: "400px",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "contain"