import { useState, useEffect } from "react";
import { Wifi, Battery, Volume2, Search } from "lucide-react";

interface MenuBarProps {
  onSpotlight: () => void;
  onControlCenter: () => void;
  activeApp: string;
}

const menuItems: Record<string, string[]> = {
  Finder: ["파일", "편집", "보기", "이동", "창", "도움말"],
  Safari: ["파일", "편집", "보기", "방문 기록", "북마크", "창", "도움말"],
  메모: ["파일", "편집", "보기", "계정", "창", "도움말"],
  터미널: ["쉘", "편집", "보기", "창", "도움말"],
  "App Store": ["스토어", "편집", "보기", "창", "도움말"],
  Mail: ["파일", "편집", "보기", "사서함", "메시지", "창", "도움말"],
};

const appleMenuItems = [
  { label: "이 Mac에 관하여", divider: false },
  { label: null, divider: true },
  { label: "시스템 환경설정...", divider: false },
  { label: "App Store...", divider: false },
  { label: null, divider: true },
  { label: "최근 사용 항목", divider: false },
  { label: null, divider: true },
  { label: "강제 종료...", divider: false },
  { label: null, divider: true },
  { label: "잠자기", divider: false },
  { label: "재시작...", divider: false },
  { label: "시스템 종료...", divider: false },
  { label: null, divider: true },
  { label: "화면 잠금", divider: false },
  { label: "이 사용자로 로그아웃...", divider: false },
];

const appSubMenus: (string | null)[] = [
  "새 창",
  "새 탭",
  "열기...",
  null,
  "저장",
  "다른 이름으로 저장...",
  null,
  "닫기",
];

const shortcuts: Record<string, string> = {
  "새 창": "⌘N",
  저장: "⌘S",
  닫기: "⌘W",
  "열기...": "⌘O",
};

function DropdownMenu({ items }: { items: (string | null)[] }) {
  return (
    <div
      className="absolute top-full left-0 mt-1 w-52 rounded-xl overflow-hidden py-1"
      style={{
        background: "rgba(238,238,238,0.94)",
        backdropFilter: "blur(40px) saturate(200%)",
        WebkitBackdropFilter: "blur(40px) saturate(200%)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.08)",
      }}
    >
      {items.map((item, i) =>
        item === null ? (
          <div key={i} className="h-px bg-gray-300/70 mx-2 my-1" />
        ) : (
          <button
            key={i}
            className="w-full text-left px-4 py-[5px] text-[13px] text-gray-800 flex items-center justify-between hover:bg-blue-500 hover:text-white rounded-sm mx-auto"
            style={{ width: "calc(100% - 4px)", marginLeft: 2 }}
          >
            <span>{item}</span>
            {shortcuts[item] && (
              <span className="text-gray-400 text-[11px]">
                {shortcuts[item]}
              </span>
            )}
          </button>
        )
      )}
    </div>
  );
}

export function MenuBar({
  onSpotlight,
  onControlCenter,
  activeApp,
}: MenuBarProps) {
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });

  const currentMenus = menuItems[activeApp] ?? menuItems["Finder"];

  const closeAll = () => {
    setOpenMenu(null);
    setShowAppleMenu(false);
  };

  return (
    <>
      {(openMenu || showAppleMenu) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}

      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2 h-7"
        style={{
          background: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* Left side */}
        <div className="flex items-center gap-0">
          {/* Apple Logo */}
          <div className="relative">
            <button
              className="px-2 h-7 flex items-center rounded hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowAppleMenu(!showAppleMenu);
                setOpenMenu(null);
              }}
            >
              <svg width="13" height="16" viewBox="0 0 13 16" fill="white">
                <path d="M11.39 8.13c-.02-1.94 1.59-2.88 1.66-2.92-0.91-1.33-2.32-1.51-2.81-1.53-1.19-.12-2.32.7-2.92.7-.6 0-1.52-.68-2.5-.66-1.28.02-2.47.75-3.12 1.89-1.33 2.3-.34 5.72.95 7.59.63.91 1.38 1.93 2.37 1.89.95-.04 1.31-.61 2.46-.61 1.14 0 1.47.61 2.47.59 1.02-.02 1.67-.93 2.29-1.84.73-1.05 1.03-2.07 1.04-2.12-.02-.01-1.97-.76-1.99-2.98z" />
                <path d="M9.37 2.18c.53-.64.88-1.53.78-2.42-.75.03-1.67.5-2.21 1.13-.49.56-.91 1.46-.8 2.33.84.06 1.7-.43 2.23-1.04z" />
              </svg>
            </button>
            {showAppleMenu && (
              <div
                className="absolute top-full left-0 mt-1 w-56 rounded-xl overflow-hidden py-1 z-[60]"
                style={{
                  background: "rgba(238,238,238,0.94)",
                  backdropFilter: "blur(40px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.08)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {appleMenuItems.map((item, i) =>
                  item.divider ? (
                    <div key={i} className="h-px bg-gray-300/70 mx-2 my-1" />
                  ) : (
                    <button
                      key={i}
                      className="w-full text-left px-4 py-[5px] text-[13px] text-gray-800 hover:bg-blue-500 hover:text-white block"
                      onClick={closeAll}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Active App Name */}
          <button className="px-2 h-7 flex items-center rounded hover:bg-white/20 transition-colors text-white text-[13px] font-semibold">
            {activeApp}
          </button>

          {/* App Menus */}
          <div className="hidden md:flex items-center">
            {currentMenus.map((menu) => (
              <div key={menu} className="relative">
                <button
                  className="px-2 h-7 flex items-center rounded text-white text-[13px] transition-colors"
                  style={{
                    background:
                      openMenu === menu
                        ? "rgba(255,255,255,0.22)"
                        : "transparent",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === menu ? null : menu);
                    setShowAppleMenu(false);
                  }}
                >
                  {menu}
                </button>
                {openMenu === menu && (
                  <div
                    className="relative z-[60]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu items={appSubMenus} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <button
            className="hidden sm:flex px-2 h-7 items-center rounded hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeAll();
              onSpotlight();
            }}
          >
            <Search size={13} className="text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeAll();
              onControlCenter();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2 h-7 rounded hover:bg-white/20 transition-colors"
          >
            <Wifi size={13} className="text-white" />
            <Volume2 size={13} className="text-white" />
            <Battery size={13} className="text-white" />
          </button>

          <button
            className="flex items-center px-2 h-7 rounded hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeAll();
              onControlCenter();
            }}
          >
            <span className="text-white text-[12px] font-medium">
              <span className="hidden sm:inline">
                {formatDate(time)}&nbsp;&nbsp;
              </span>
              {formatTime(time)}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
