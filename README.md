# 토이 프로젝트(개인) 
> ⛔️ 현재, API 권한 만료로 인해 작동하지 않습니다. 현재 NextJS를 공부하고 있어, 다른 API를 사용해서 마이그레이션 진행 중입니다.
https://github.com/lunarmoon7/weather-nextjs
## 오늘 날씨가 어때요?[가제]

## 프로젝트 계획 동기
> 3학년 2학기 '모바일 프로그래밍(안드로이드)' 과목을 수강할때 팀 프로젝트가 있었다.
> 이때 우리 팀이 정한 주제는 날씨를 보여주고 그에 맞는 옷차림을 추천해주는 앱이었다.
> 내가 담당한 역할은 날씨 api를 불러와서 메인 화면에 날씨를 보여주는 것이었는데 나 포함 모든 팀원들이 모바일 프로그래밍이 처음이었고, 특히 나는 api를 사용해 본적이 없었기 때문에 많은 어려움이 있었다.
> 어찌저찌 공부를 하면서 구현은 했었는데 오류도 많았고 코드도 많이 지저분했다.

> 이때의 겪은 오류, 제대로 구현해보지 못한 경험 때문에 다시 한번 제대로 공부하면서 구현해보고 싶다는 생각이 들었고, 디자인부터 설계, 로직 구현을 모두 맡아서 해보기로 했다. 

## Skill Stacks
- HTML
- CSS
- JavaScript
- React
- OpenWeatherMap API
- Leaflet

### Openweathermap API
#### 선택 이유
> * 이유의 대부분은 예전에 진행했던 팀 프로젝트에서 기상청 Api를 시도했었는데,
> * 문서도 부족하고 원하는 데이터가 없거나 부족한 경우가 많았어서 Openweathermap을 사용했었는데 이때의 실수들이나 오류들을 다시 한번 고쳐보고 싶었다.
> * 추가로 Openweathermap을 사용해서 만든 프로젝트들이 엄청 많아서 참고하기 좋다고 판단했다.
> * (Ambee라는 Api도 찾아봤는데 이 또한 문서가 친절하지 않고 이걸로 구현한 참고용 프로젝트가 많지 않았음)

## 사용 라이브러리 
### Leaflet 
> 프로젝트의 기능 중에 하나로 '지도'가 있다.
> 단순 지도를 보여주는 것이 아닌 지도 위에 레이어(온도, 기압, 풍향, 구름 etc)를 덮어서 원하는 옵션을 클릭했을 때 그에 맞는 레이어가 덮힌 지도를 보여준다. 
> Openweathermap에는 이러한 레이어를 제공해주는 Api가 있는데, Leaflet을 지원한다고 나와있어서 선택하게 됐다.

> ###### [참고] <https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=30&lon=-20&zoom=3>

## 기능 설명
### 기능
* Weather.js : 현재 날씨 보여준다.
* WeekWeather.js : 다음 7일의 날씨를 보여준다.
* Today.js : 현재 날씨의 세부사항(습도, 체감온도, 강수량, 풍속, 기압, 가시거리, 일출 & 일몰 시간대)을 알려준다.
* Map.js : 다양한 레이어가 적용된 지도를 보여준다.

> #### Openweathermap API 정보
- 전체적인 날씨 정보
    - 현재 시간 날씨 → Current weather data
        - `API CALL : "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"`
    - 1시간 간격의 날씨 → Hourly Forecast 4 days(현재 일 포함해서 보여줌,단 12시에 요청하면 13시꺼부터 알려준다.)
        - `API CALL : "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}"`
    - n일 간격의 다음 날씨 → Daily Forecast 16 days(현재 일 포함해서 보여줌)
        - `API CALL : "api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}"`

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

# 실행 화면
## 전체 화면
<img width="1344" alt="스크린샷 2023-02-02 오후 6 15 46" src="https://user-images.githubusercontent.com/101445377/216282511-2277cf54-0aea-4612-84a5-d1cdac51fe5e.png">

## 오늘 날씨
<img width="360" alt="스크린샷 2023-02-02 오후 6 19 09" src="https://user-images.githubusercontent.com/101445377/216283038-5cfb478a-c510-466b-8df5-f6b3aaf7ec34.png">

## 오늘 날씨 세부정보
<img width="943" alt="스크린샷 2023-02-02 오후 6 19 15" src="https://user-images.githubusercontent.com/101445377/216283044-13c86473-5175-423a-8b39-4c5a8b4f867c.png">

## 다음 1주 날씨
<img width="360" alt="스크린샷 2023-02-02 오후 6 19 21" src="https://user-images.githubusercontent.com/101445377/216283047-be1122c5-6c1d-44c5-bb43-e5036c307344.png">

## 지도 레이어
<img width="935" alt="스크린샷 2023-02-02 오후 6 19 26" src="https://user-images.githubusercontent.com/101445377/216283057-ae45d71d-3e52-4858-881f-89f0dfcea620.png">
