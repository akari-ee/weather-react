import { useState, useEffect } from "react";
import Weatehr from "./components/Weather";
import WeekWeather from "./components/WeekWeather";
import Today from "./components/Today";
import styles from "./Home.module.css";
import Map from "./components/Map";

const APIKEY = "9f5e42842d269c898ad63d79ed4afc01";
// const LAT = 37.471077623795;
// const LON = 126.93920205178;

const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let lat, lng, detailAddr;

function Home() {
    const [loading, setLoading] = useState(true);
    // * for Weather.js
    const [info, setInfo] = useState({}); // ! Total json
    const [weather, setWeather] = useState({}); // icon, desc
    const [main, setMain] = useState([]); // temp, maxtemp, mintemp, feels, humid, pressure
    const [wind, setWind] = useState({}); // windSpeed
    const [sys, setSys] = useState({}); // sunset, sunrise
    // * for WeekWeather.js
    // ! icon, minTemp, maxTemp, [date, day] => unix to real time => use TimeStamp => calculate
    const [weekList, setWeekList] = useState([]); // WeekWeather List
    const [fullDate, setFullDate] = useState([]); // * day, month, date Array for each weekList[i].dt
    
    
    // * Unix time to Real time
    const unixToReal = (dt, i) => {
        const real = new Date(dt * 1000);
        const day = dayList[real.getDay()]; // 0 - 6(Sun - Sat)
        const month = monthList[real.getMonth()]; // 1 - 12(Jan - Dec)
        const date = real.getDate(); // 1 - 31

        setFullDate(result => [...result, { day: `${day}`, month: `${month}`, date: `${date}`}]);
    }

    // * get position
    const getLocation = () => {
        if (navigator.geolocation) { // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                console.log('위도 : ' + lat + ' 경도 : ' + lng);

                getCurrentWeather(lat, lng);
                getWeekWeather(lat, lng)
                getAddr(lat, lng);
                setLoading(false);
            }, function(error) {
                console.error(error);
            }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: Infinity
            });
        } else {
            alert('GPS를 지원하지 않습니다');
            return;
        }
    }
    
    // 위도 경도 좌표로 주소 얻기
    const getAddr = (lat, lng) => {
        // 주소-좌표 변환 객체를 생성합니다
        const { kakao } = window;
        let geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(lat, lng);
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                detailAddr = result[0].address.address_name; // 서울 관악구 봉천동 1712
                let addrArray = detailAddr.split(" ");
                detailAddr = "";
                for(let i = 0; i < addrArray.length - 1; i++) {
                    detailAddr += addrArray[i] + " ";
                }
                console.log(detailAddr);
            }
        }
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }

    // * get Today's Weather
    const getCurrentWeather = async (lat, lng) => {
        const json = await(
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`
            )
        ).json();
        setInfo(json);
        setWeather(json.weather[0]);
        setMain(json.main);
        setWind(json.wind);
        setSys(json.sys);
    }

    // * get Week Weahter
    const getWeekWeather = async (lat, lng) => {
        const json = await(
            await fetch(
                `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=8&appid=${APIKEY}&units=metric&lang=kr`
            )
        ).json();
        setWeekList(json.list);
    }

    // * set CurrentWeather & WeekWeather
    useEffect(() => {
        getLocation();
    }, []);

    // console.log(info);
    
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
        loading ? 
        ( <div className={styles.loading_container}>Making...</div> ) 
        :(
        <div className={styles.container}>
            <div className={styles.current}>
                <Weatehr
                    // feels={main.feels_like}
                    minTemp={Math.ceil(main.temp_min)}
                    maxTemp={Math.ceil(main.temp_max)}
                    temp={Math.ceil(main.temp)}
                    // humid={main.humidity}
                    // pressure={main.pressure}
                    // rain={null}
                    // sunrise={sys.sunrise}
                    // sunset={sys.sunset}
                    // windSpeed={wind.speed}
                    icon={weather.icon}
                    desc={weather.description} 
                    dt={info.dt}
                    loc={detailAddr}
                />
            </div>
            <div className={styles.next}>
                <div className={styles.title}>7 days forecast</div>
                <div className={styles.weather_wrapper}>
                    {weekList.map((week, index) => (
                        fullDate[index] &&
                        <WeekWeather 
                            key={week.dt}
                            month={fullDate[index].month}
                            day={fullDate[index].day}
                            date={fullDate[index].date}
                            maxTemp={Math.ceil(week.temp.max)}
                            minTemp={Math.ceil(week.temp.min)}
                            icon={week.weather[0].icon}
                        />
                    ))}
                </div>
            </div>
            <Today
                feels={Math.ceil(main.feels_like)}
                humid={main.humidity}
                pressure={main.pressure}
                rain={info.rain === undefined ? 0 : info.rain}
                sunrise={new Date(sys.sunrise * 1000).getHours() + " : " +new Date(sys.sunrise * 1000).getMinutes()}
                sunset={new Date(sys.sunset * 1000).getHours() + " : " +new Date(sys.sunset * 1000).getMinutes()}
                windSpeed={Math.ceil(wind.speed)}
                visibility={(info.visibility / 1000)}
            />

            <div className={styles.map_container}>
                {(lat && lng) &&
                    <Map 
                        x={lat}
                        y={lng}
                    />
                }
            </div>
        </div>
        )
    );
}

export default Home;
