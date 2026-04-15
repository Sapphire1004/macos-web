// Chromium 내부 리소스 대체 shim (ES module alias로 매핑)
// ./dino/ 폴더의 ts 파일들이 chrome://resources/js/*.js를 import하는데,
// 브라우저에선 존재하지 않으므로 vite alias로 이 파일을 대체.

// Chromium이 window에 주입하는 전역 필드 타입 확장 (no-op stub)
declare global {
  interface Window {
    initializeEasterEggHighScore?: (highScore: number) => void;
    errorPageController?: {
      trackEasterEgg: () => void;
      updateEasterEggHighScore: (score: number) => void;
      resetEasterEggHighScore: () => void;
      trackClick: (eventType: number) => void;
    };
  }
}

export function assert<T>(condition: T, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? "Assertion failed");
  }
}

// loadTimeData: Chromium이 페이지에 주입하는 설정 저장소.
// 웹에선 쓸 수 없으니 a11y 문자열만 직접 주입.
// Chromium components_strings_ko.xtb 원본 번역.
const a11yStrings: Record<string, string> = {
  dinoGameA11yAriaLabel: "공룡 게임입니다, 스페이스바를 눌러 플레이하세요",
  dinoGameA11yDescription:
    "공룡 게임입니다. 픽셀 스타일의 공룡이 선인장과 프테로사우루스를 피하며 황무지를 달려갑니다. 오디오 신호음이 들리면 Space 키를 눌러 장애물을 뛰어넘으세요.",
  dinoGameA11yGameOver: "게임 종료, 점수는 $1점입니다.",
  dinoGameA11yHighScore: "최고 점수는 $1점입니다.",
  dinoGameA11yJump: "점프하세요",
  dinoGameA11yStartGame: "게임이 시작되었습니다.",
  dinoGameA11ySpeedToggle: "느린 속도로 시작",
};

export const loadTimeData = {
  valueExists(key: string): boolean {
    return key in a11yStrings;
  },
  getValue(key: string): string {
    return a11yStrings[key] ?? "";
  },
  getBoolean(_key: string): boolean {
    return false;
  },
  getString(key: string): string {
    return a11yStrings[key] ?? "";
  },
};
