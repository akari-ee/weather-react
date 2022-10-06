# 토이 프로젝트(개인) 
## 오늘 날씨가 어때요?[가제]

## 프로젝트 계획 동기
> 3학년 2학기 '모바일 프로그래밍(안드로이드)' 과목을 수강할때 팀 프로젝트가 있었다.
> 이때 우리 팀이 정한 주제는 날씨를 보여주고 그에 맞는 옷차림을 추천해주는 앱이었다.
> 내가 담당한 역할은 날씨 api를 불러와서 메인 화면에 날씨를 보여주는 것이었는데 나 포함 모든 팀원들이 모바일 프로그래밍이 처음이었고, 특히 나는 api를 사용해 본적이 없었기 때문에 많은 어려움이 있었다.
> 어찌저찌 공부를 하면서 구현은 했었는데 오류도 많았고 코드도 많이 지저분했다.

> 이때의 겪은 오류, 제대로 구현해보지 못한 경험 때문에 다시 한번 제대로 공부하면서 구현해보고 싶다는 생각이 들었고, 디자인부터 설계, 로직 구현을 모두 맡아서 해보기로 했다. 

## 사용 언어, 프레임워크
* 언어 : HTML, CSS, JAVASCRIPT
* 프레임워크 : React

## 사용한 API 
> ### Openweathermap API
>   * #### 사용 이유 : 예전에 진행했던 팀 프로젝트에서 기상청 Api를 시도했었는데 문서도 부족하고 원하는 데이터가 없거나 부족한 경우가 많았어서 Openweathermap을 사용했다.(Ambee라는 Api도 찾아봤는데 이 또한 문서가 친절하지 않고 이걸로 구현한 참고용 프로젝트가 많지 않았음) 
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
