# Edge Cases — 나중에 처리할 이슈들

실제 사용/체감상 문제가 생길 때 하나씩 개선. MVP 단계에서는 핵심 시나리오만 통과하면 충분.

---

## 🦖 Dino Game (Safari Offline Page)

### 1. 탭별 독립 Dino 인스턴스 (Option A)

**현황**: 현재 Runner 싱글톤 + 탭별 상태 저장/복원 방식(B). 모든 탭이 같은 게임 인스턴스를 공유.

**원본 Chrome 동작**:
- 각 오프라인 탭이 **독립된 Runner 인스턴스** 보유
- 탭 A에서 점수 100점, 탭 B는 별개로 새 게임
- 탭 전환해도 각자 상태 완벽 보존

**개선안 (Option A)**:
- Chromium `Runner` 싱글톤 패턴 해제
- `runnerInstance` 전역 → Map<containerId, Runner>
- 각 인스턴스가 자기 `#offline-resources-{tabId}` 참조
- 탭 mount 시 해당 탭 전용 Runner 생성
- 탭 unmount 시 해당 Runner만 `destroy()`

**주의**:
- Chromium 원본 소스 여러 파일 수정 필요
- upstream 업데이트 따라잡기 어려워짐 (패치 충돌 관리)
- 구현 시간: 반나절~1일

**우선순위**: 실제 사용자가 "탭마다 다른 점수/상태" 를 원할 때 진행.

---

### 2. Runner 인스턴스 정리

**현상**: `Runner.initializeInstance()` 싱글톤. `destroy()` 호출 없음.

**문제**:
- Safari 창 닫아도 document keydown listener 살아있음
- 메모리 누수 (이미지 스프라이트, raf 참조 등)
- 다시 Safari 열었을 때 state dirty

**개선안**:
- Runner에 `destroy()` public 메서드 추가
- `DinoGame` unmount 시 호출
- `#offline-resources`, `.icon-offline` DOM도 cleanup

---

### 3. 주소창 URL 입력

**현상**: 주소창에 URL 입력하면 `inputUrl` state만 바뀜. 실제 페칭 없음.

**문제**:
- 오프라인 상태에서 URL 변경해도 dino 페이지 계속 표시
- 온라인 상태에서 URL 입력해도 이동 로직 없음 (Favorites/News 고정)

**개선안**:
- `useQuery` 또는 `fetch`로 실제 요청 흉내
- 에러 시 offline 페이지, 성공 시 가짜 렌더

---

### 4. 키 이벤트 완전 격리

**현상**: Runner가 `document.addEventListener('keydown')` 전역 리스너.

**문제**:
- Safari 비활성일 때 `externallyLocked` 로 무시는 하지만 리스너는 계속 살아있음
- 브라우저 기본 Space 스크롤은 preventDefault 덕에 막히지만 다른 키 조합 충돌 가능

**개선안**:
- Runner 내부 이벤트 핸들러를 `document` → `canvas` 요소 기반으로 재구성
- `tabIndex={0}` + focus 시에만 키 받기
- 공룡 게임 자체 브랜치에서 upstream 수정 후 재포트

---

### 5. Safari 창 리사이즈 중 dino 깨짐

**현상**: `Window.tsx` 에 `minW=700, minH=500` 제한 걸려있음.

**문제**:
- 모바일 뷰포트(width < 640)에서는 `initialW=window.innerWidth` 로 설정되어 minW 무시 가능성
- canvas 600px 고정이라 작은 화면에선 삐져나감

**개선안**:
- Dino canvas 내부에서도 `adjustDimensions()` 호출 (이미 Runner 내부에 있음)
- outerContainerEl width 변화 감지 → Runner 재조정
- ResizeObserver 활용

---

### 6. 창 최소화 / 복원 시 Runner 상태

**현상**: Safari 창 최소화돼도 Runner는 계속 돌아감(실제로 canvas 숨겨져도 raf 호출).

**문제**:
- CPU 낭비 (게임 루프 매 프레임 실행)
- 배터리 / 성능

**개선안**:
- `isMinimized` prop 받아서 `setExternallyLocked` 에 포함
- `document.visibilitychange` 활용 (이미 Chromium Runner에 있긴 함)

---

### 7. High Score 저장

**현상**: Chromium Runner는 자체 localStorage 키로 최고점 저장. 우리 macOS-web 환경에서 충돌 가능.

**확인 필요**:
- 기존 chrome://dino와 같은 key 써서 덮어쓰는지
- macos-web 다른 앱 localStorage 키와 충돌 여부

---

### 8. 낮/밤 전환 CSS 충돌

**현상**: 밤 모드는 `.inverted` 클래스를 body/container에 토글 → `filter: invert(1)`.

**문제**:
- Safari 창 이외 영역(Dock, MenuBar 등)도 함께 반전됨
- macOS-web 전체 UI가 뒤집힘

**개선안**:
- `.runner-container` 내부로 invert 범위 제한
- Runner 패치: inverted 클래스 붙이는 대상 수정

---

## 🪟 Window System

### 9. 창 Z-index / 포커스 흐름

**현상**: z-index만 조정, 실제 keyboard focus는 별개.

**문제**:
- tabIndex 관리 안 돼서 Tab 키 네비게이션 이상할 수 있음
- 접근성(a11y) 부족

---

### 10. 모바일 뷰포트 리사이즈 대응

**현상**: 창 열 때만 `window.innerWidth < 640` 체크.

**문제**:
- 데스크톱으로 열고 모바일 사이즈로 리사이즈 시 레이아웃 깨짐
- 반대의 경우도 마찬가지

---

## 🌐 Network Context (Wi-Fi)

### 11. 실제 네트워크 감지 대응

**현상**: `wifiEnabled` 는 순수 UI state. 실제 `navigator.onLine` 무시.

**의도된 동작**: 데모 목적상 의도적.

**개선안 (선택)**:
- `navigator.onLine` 도 함께 보고 "실제 오프라인 + 가상 ON" 같은 상태 UI에 힌트
- 예: "실제 인터넷 연결이 끊겼습니다" 경고 배너

---

## 📝 일반 UX

### 12. 공룡 게임 툴팁/문구 i18n

**현상**: `safari.offline.*` 키는 있지만 공룡 게임 내부 툴팁(예: slow-speed-option aria-label)은 하드코딩 영어.

**개선안**:
- 필요한 aria-label / title 속성 추출
- react-i18next 로 번역 키 연결
- Chromium Runner 내부 fork 버전에서 i18n prop으로 받기

---

## 우선순위 제안

| 우선순위 | 항목 | 이유 |
|---------|------|------|
| High | #2 Runner destroy | 메모리 누수 (실사용 영향 큼) |
| High | #12 i18n 문구 | 일본어/한국어 사용자 UX |
| Med | #5 리사이즈 대응 | 모바일 체감 |
| Med | #6 최소화 시 pause | 성능/배터리 |
| Med | #8 invert 범위 | 밤 모드 전환 시 시각적 버그 |
| Low | #1 탭 독립 | 현재 MVP로 충분 |
| Low | #3 URL 페칭 | 데모용으로 과함 |

---

## 수정 원칙

- **하나씩 처리** — 모든 걸 한번에 고치지 말 것
- **실제 사용 시 문제 생길 때** 우선순위 올림
- **테스트 케이스 미리 작성** → 개선 후 회귀 방지
- **Chromium 원본 수정은 최소화** — 패치 기록 남겨서 업스트림 따라잡기 쉽게
