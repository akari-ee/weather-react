- 전체적인 날씨 정보
    - 현재 시간 날씨(~~18:13이면 18:00 일 때 날씨~~) → Current weather data
    - 1시간 간격의 날씨 → Hourly Forecast 4 days(현재 일 포함해서 보여줌,단 12시에 요청하면 13시꺼부터 알려준다.)
        - "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=37.471077623795&lon=126.93920205178&appid=9f5e42842d269c898ad63d79ed4afc01"
    - n일 간격의 다음 날씨 → Daily Forecast 16 days(현재 일 포함해서 보여줌)
        - "api.openweathermap.org/data/2.5/forecast/daily?lat=37.471077623795&lon=126.93920205178&cnt=7&appid=9f5e42842d269c898ad63d79ed4afc01"

- 세부 날씨 정보
    - 현재 시간 날씨
        - 최저 온도
        - 최고 온도
        - 체감 온도
        - 습도(%)
        - 강수량
        - 일출 / 일몰
        - 풍속
        - 기압
        - 지역(보류) => 나중에 위치 서비스 권한으로 처리해볼 것
        - 날씨 아이콘 이미지
<!-- // * Ambee APIKEY
// const API_KEY = "6601d70d3a7b873c14b749f94fb24de17cffce9c3d44e9c2602fcc227a0f90e8";
// ! Ambee API
// 3일간의 날씨 예보 알려줌 (현재 27일이면 -> 28, 29, 30)
// fetch("https://api.ambeedata.com/weather/forecast/daily/by-lat-lng?lat=37.471077623795&lng=126.93920205178", {
// 	"method": "GET",
// 	"headers": {
// 		"x-api-key": API_KEY,
// 		"Content-type": "application/json"
// 	}
// })
// .then(response => {
// 	console.log(response.json());
// })
// .catch(err => {
// 	console.error(err);
// });

// 2일간의 날씨 예보를 1시간 대 별로 알려줌(27일 12시면 29일 12시까지)
// fetch("https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=37.471077623795&lng=126.93920205178", {
// 	"method": "GET",
// 	"headers": {
// 		"x-api-key": API_KEY,
// 		"Content-type": "application/json"
// 	}
// })
// .then(response => {
// 	console.log(response.json());
// })
// .catch(err => {
// 	console.error(err);
// });
<!-- // !-- -->
