const APIKEY = "9f5e42842d269c898ad63d79ed4afc01";
let lat, lng, addr;

export function init({APIKEY, setLoading, setInfo, setWeather, setMain, setWind, setSys, setWeekList, lat, lng}) {
  getLocation({APIKEY, setLoading, setInfo, setWeather, setMain, setWind, setSys, setWeekList});
}
export function getLocation({APIKEY, setLoading, setInfo, setWeather, setMain, setWind, setSys, setWeekList, setCityInfo, cityInfo}) {
    setLoading(true);
    // let lat, lng, addr;
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          getCurrentWeather({APIKEY, setInfo, setWeather, setMain, setWind, setSys, lat, lng});
          getWeekWeather({APIKEY, setWeekList, lat, lng});
          setLoading(false);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
}

// export function getAddr({lat, lng, setCityInfo, cityInfo}){
//     // 주소-좌표 변환 객체를 생성합니다
//     const { kakao } = window;
//     let detailAddr;
//     let geocoder = new kakao.maps.services.Geocoder();
//     let coord = new kakao.maps.LatLng(lat, lng);
//     let callback = (result, status) => {
//       if (status === kakao.maps.services.Status.OK) {
//         detailAddr = result[0].address.address_name; // 서울 관악구 봉천동 1712
//         let addrArray = detailAddr.split(" ");
//         detailAddr = "";
//         for (let i = 0; i < addrArray.length - 1; i++) {
//           detailAddr += addrArray[i] + " ";
//         }
//         addr = detailAddr
//         setCityInfo({...cityInfo, addr: addr})
//       }
//     };
//     geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
// }

export async function getCurrentWeather({APIKEY, setInfo, setWeather, setMain, setWind, setSys, lat, lng}) {
    const json = await (
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
export async function getWeekWeather({APIKEY, setWeekList, lat, lng}) {
    const json = await (
      await fetch(
        `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=8&appid=${APIKEY}&units=metric&lang=kr`
      )
    ).json();
    setWeekList(json.list);
}