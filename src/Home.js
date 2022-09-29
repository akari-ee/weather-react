import { useState, useEffect } from "react";
import Weatehr from "./components/Weather";
import WeekWeather from "./components/WeekWeather";
import styles from "./Home.module.css";

const APIKEY = "9f5e42842d269c898ad63d79ed4afc01";
const LAT = 37.471077623795;
const LON = 126.93920205178;

const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Home() {
    // * for Weather.js
    const [info, setInfo] = useState({}); // ! Total json
    const [weather, setWeather] = useState({}); // icon, desc
    const [main, setMain] = useState([]); // temp, maxtemp, mintemp, feels, humid, pressure
    const [wind, setWind] = useState({}); // windSpeed
    const [sys, setSys] = useState({}); // sunset, sunrise
    // * for WeekWeather.js
    // ! icon, minTemp, maxTemp, [date, day] => unix to real time => use TimeStamp => calculate
    const [weekList, setWeekList] = useState([]); // WeekWeather List
    const [fullDate, setFullDate] = useState([]);
    // * day, month, date Array for weekList[i].dt
    
    // * Unix time to Real time
    const unixToReal = (dt, i) => {
        const real = new Date(dt * 1000);
        const day = dayList[real.getDay()]; // 0 - 6(Sun - Sat)
        const month = monthList[real.getMonth()]; // 1 - 12(Jan - Dec)
        const date = real.getDate(); // 1 - 31

        setFullDate(result => [...result, { day: `${day}`, month: `${month}`, date: `${date}`}]);
    }

    // * get Today's Weather
    const getCurrentWeather = async () => {
        const json = await(
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APIKEY}&units=metric&lang=kr`
            )
        ).json();
        setInfo(json);
        setWeather(json.weather[0]);
        setMain(json.main);
        setWind(json.wind);
        setSys(json.sys);
    }

    // * get Week Weahter
    const getWeekWeather = async () => {
        const json = await(
            await fetch(
                `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${LAT}&lon=${LON}&cnt=8&appid=${APIKEY}&units=metric&lang=kr`
            )
        ).json();
        setWeekList(json.list);
    }

    // * set CurrentWeather & WeekWeather
    useEffect(() => {
        getCurrentWeather();
        getWeekWeather();
    }, []);
    // * set WeekWeather's fullDate(Array)

    useEffect(() => {
        weekList.map((week, index) => {
            unixToReal(week.dt, index);
        })
        weekList.shift(); // remove first (weekList[0] = currentWeather)
        fullDate.shift();
    }, [weekList]);

    // ! RETURN
    return (
        <div className={styles.container}>
            <div className={styles.current}>
                <Weatehr
                    feels={main.feels_like}
                    minTemp={main.temp_min}
                    maxTemp={main.temp_max}
                    humid={main.humidity}
                    pressure={main.pressure}
                    rain={null}
                    sunrise={sys.sunrise}
                    sunset={sys.sunset}
                    windSpeed={wind.speed}
                    icon={weather.icon}
                    desc={weather.description} 
                />
            </div>
            <div className={styles.next}>
                {weekList.map((week, index) => (
                    fullDate[index] &&
                    <WeekWeather 
                        key={week.dt}
                        month={fullDate[index].month}
                        day={fullDate[index].day}
                        date={fullDate[index].date}
                        maxTemp={week.temp.max}
                        minTemp={week.temp.min}
                    />
                ))}
            </div>
        </div>
    );
}


export default Home;
