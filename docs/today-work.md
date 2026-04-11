사용 API

Browser Geolocation API (navigator.geolocation.getCurrentPosition) — 브라우저 내장 기능으로 사용자의 위도/경도를 가져옴. 별도 설치나 키 없이 HTTPS 환경이면 바로 사용 가능. 사용자가 허용 팝업에서 승인해야 동작.
Open-Meteo API (api.open-meteo.com/v1/forecast) — 무료 오픈소스 날씨 API. API 키 불필요, 요청 제한 느슨함. 위도/경도를 쿼리 파라미터로 보내면 JSON으로 날씨 데이터 반환.

API 호출 흐름
Geolocation으로 위도/경도 획득 → Open-Meteo에 GET 요청 → JSON 응답 파싱 → 화면 렌더링
Open-Meteo 요청 파라미터

latitude, longitude — Geolocation에서 받은 좌표
current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code — 현재 기온, 습도, 풍속, 날씨 코드
daily=temperature_2m_max,temperature_2m_min,weather_code — 일별 최고/최저 기온, 날씨 코드
timezone=auto — 좌표 기반 시간대 자동 설정
forecast_days=5 — 5일 예보

날씨 코드 처리
Open-Meteo는 WMO 표준 코드(0=맑음, 61=비, 71=눈 등)를 숫자로 반환. 코드에서 이걸 한국어 라벨 + 이모지 아이콘으로 매핑하는 객체(WMO_CODES)를 만들어서 변환.
시계
별도 API 없이 setInterval로 1초마다 new Date()를 갱신해서 브라우저 로컬 시간을 표시.