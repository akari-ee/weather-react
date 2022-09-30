import styles from "./Today.module.css";
import { WiThermometer, WiRaindrop, WiStrongWind, WiHumidity, WiSunrise, WiSunset, WiBarometer } from "react-icons/wi"; 
import { MdOutlineVisibility } from "react-icons/md"; // visibility

const DEG_ICON = "°";

function Today({feels, humid, pressure, rain, sunrise, sunset, windSpeed, visibility}) {
    return (
        <div className={styles.container}>
            <div className={styles.feels_wrapper}>
                <div className={styles.subtitle}>
                    <WiThermometer className={styles.icon}/>
                    Feels Like
                </div>
                <div className={styles.content}>{feels}{DEG_ICON}</div>
            </div>
            <div className={styles.rain_wrapper}>
                <div className={styles.subtitle}>
                    <WiRaindrop className={styles.icon}/>
                    Rain
                    </div>
                <div className={styles.content}>{rain}&nbsp;mm</div>
            </div>
            <div className={styles.humid_wrapper}>
                <div className={styles.subtitle}><WiHumidity className={styles.icon}/>Humidity</div>
                <div className={styles.content}>{humid}&nbsp;%</div>
            </div>
            <div className={styles.wind_wrapper}>
                <div className={styles.subtitle}><WiStrongWind className={styles.icon}/>Wind</div>
                <div className={styles.content}>{windSpeed}&nbsp;m/s</div>
            </div>
            <div className={styles.press_wrapper}>
                <div className={styles.subtitle}><WiBarometer className={styles.icon}/>Pressure</div>
                <div className={styles.content}>{pressure}&nbsp;hPa</div>
            </div>
            <div className={styles.vis_wrapper}>
                <div className={styles.subtitle}><MdOutlineVisibility className={styles.icon}/>Visibility</div>
                <div className={styles.content}>{visibility}&nbsp;km</div>
            </div>
            <div className={styles.sun_wrapper}>
                <div className={styles.title}>Sunrise & Sunset</div>
                <div className={styles.sunrise}>
                    <div className={styles.sTitle}><WiSunrise className={styles.icon}/></div>
                    <div className={styles.sContent}>{sunrise}</div>
                </div>
                <div className={styles.sunset}>
                    <div className={styles.sTitle}><WiSunset className={styles.icon}/></div>
                    <div className={styles.sContent}>{sunset}</div>
                </div>
            </div>
        </div>
    );
}

export default Today;