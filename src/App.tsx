import { useState, useCallback, useRef, useEffect } from "react";
import { MenuBar } from "./components/MenuBar";
import { Dock } from "./components/Dock";
import { Window } from "./components/Window";
import { Spotlight } from "./components/Spotlight";
import { ControlCenter } from "./components/ControlCenter";
import { Widgets, WidgetPicker, type WidgetInstance } from "./components/Widgets";
import { FinderWindow } from "./components/FinderWindow";
import { SafariWindow } from "./components/SafariWindow";
import { NotesWindow } from "./components/NotesWindow";
import { TerminalWindow } from "./components/TerminalWindow";
import { Plus } from "lucide-react";

// ── Dock icon components ────────────────────────────────────────────────────
function FinderIcon() {
  return (
    <div
      className="w-full h-full"
      style={{
        background: "linear-gradient(160deg, #7ac6fd 0%, #1568e8 100%)",
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full p-1">
        <rect
          x="8"
          y="20"
          width="84"
          height="65"
          rx="10"
          fill="rgba(255,255,255,0.15)"
        />
        <circle cx="38" cy="45" r="14" fill="rgba(255,255,255,0.9)" />
        <circle cx="62" cy="45" r="14" fill="rgba(255,255,255,0.75)" />
        <ellipse cx="36" cy="43" rx="4" ry="5" fill="#1568e8" />
        <ellipse cx="60" cy="43" rx="4" ry="5" fill="#1568e8" />
        <path
          d="M26 60 Q50 72 74 60"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function SafariIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="saf2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1aa0f0" />
          <stop offset="100%" stopColor="#006edb" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#saf2)" />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
      />
      <polygon
        points="50,18 64,64 50,56 36,64"
        fill="white"
        opacity="0.95"
        transform="rotate(45,50,50)"
      />
      <polygon
        points="50,18 64,64 50,56 36,64"
        fill="#ff3b30"
        opacity="0.9"
        transform="rotate(225,50,50)"
      />
    </svg>
  );
}

function NotesIcon() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #fff9d0, #ffd60a)",
      }}
    >
      <div className="w-9 h-10 bg-white rounded-md shadow-md flex flex-col p-1.5 gap-0.5 mt-1">
        <div className="h-1.5 bg-yellow-300 rounded-sm" />
        <div className="h-px bg-gray-200 rounded" />
        <div className="h-px bg-gray-200 rounded" />
        <div className="h-px bg-gray-100 rounded w-3/4" />
        <div className="h-px bg-gray-100 rounded w-2/3" />
      </div>
    </div>
  );
}

function TerminalIcon() {
  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-[22%]"
      style={{ background: "#282c34" }}
    >
      <div className="text-[10px] font-mono leading-tight p-1">
        <div className="text-green-400">$ ls -la</div>
        <div className="text-green-300 opacity-80">drwx------</div>
        <div className="text-green-300 opacity-60">-rw-r--r--</div>
        <div className="text-white opacity-40">
          _<span className="animate-pulse">█</span>
        </div>
      </div>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #2196f3 0%, #1565c0 100%)",
      }}
    >
      <svg viewBox="0 0 60 60" className="w-10 h-10">
        <text
          x="30"
          y="36"
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontFamily="system-ui"
          fontWeight="300"
        >
          A
        </text>
        <line
          x1="8"
          y1="46"
          x2="52"
          y2="46"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function MailIcon() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #42a5f5 0%, #1565c0 100%)",
      }}
    >
      <svg viewBox="0 0 64 48" className="w-10 h-7">
        <rect x="2" y="2" width="60" height="44" rx="6" fill="white" opacity="0.95" />
        <polyline
          points="2,4 32,28 62,4"
          fill="none"
          stroke="#1565c0"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TrashIcon() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #cfd8dc 0%, #90a4ae 100%)",
      }}
    >
      <svg viewBox="0 0 50 60" className="w-8 h-9">
        <rect
          x="6"
          y="14"
          width="38"
          height="40"
          rx="4"
          fill="rgba(255,255,255,0.7)"
        />
        <rect
          x="0"
          y="10"
          width="50"
          height="6"
          rx="3"
          fill="rgba(255,255,255,0.9)"
        />
        <rect
          x="18"
          y="4"
          width="14"
          height="7"
          rx="3"
          fill="rgba(255,255,255,0.9)"
        />
        <line
          x1="17"
          y1="22"
          x2="17"
          y2="46"
          stroke="rgba(100,120,140,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="25"
          y1="22"
          x2="25"
          y2="46"
          stroke="rgba(100,120,140,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="33"
          y1="22"
          x2="33"
          y2="46"
          stroke="rgba(100,120,140,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ── App Store Window ────────────────────────────────────────────────────────
function AppStoreWindow() {
  const featured = [
    { name: "Figma", icon: "🎨", rating: "4.8", category: "디자인", price: "무료", color: "#a259ff" },
    { name: "Slack", icon: "💬", rating: "4.6", category: "업무", price: "무료", color: "#4a154b" },
    { name: "Notion", icon: "📋", rating: "4.7", category: "생산성", price: "무료", color: "#000" },
    { name: "VS Code", icon: "💻", rating: "4.9", category: "개발", price: "무료", color: "#007acc" },
    { name: "Spotify", icon: "🎵", rating: "4.5", category: "음악", price: "무료", color: "#1db954" },
    { name: "1Password", icon: "🔐", rating: "4.8", category: "유틸리티", price: "₩14,900", color: "#0076d1" },
  ];
  const [installed, setInstalled] = useState<string[]>([]);

  return (
    <div className="h-full flex" style={{ background: "#f5f5f7" }}>
      <div
        className="w-44 flex-shrink-0 pt-2"
        style={{
          background: "rgba(235,235,235,0.9)",
          borderRight: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {[
          { label: "탐색", items: ["오늘", "게임", "앱", "아케이드"] },
          {
            label: "카테고리",
            items: ["개발자 도구", "그래픽 & 디자인", "생산성", "유틸리티"],
          },
        ].map((sec) => (
          <div key={sec.label} className="mb-2">
            <p className="px-3 py-1 text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
              {sec.label}
            </p>
            {sec.items.map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-1.5 text-[13px] text-gray-600 hover:bg-black/5 transition-colors rounded"
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-5">
          <div
            className="rounded-2xl overflow-hidden mb-5 h-40 flex items-center justify-between px-8"
            style={{
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            }}
          >
            <div className="text-white">
              <p className="text-[11px] opacity-60 uppercase tracking-wider mb-1">
                Editor's Choice
              </p>
              <p className="text-[22px] font-semibold leading-tight">
                2026년
                <br />
                생산성 앱 모음
              </p>
              <p className="text-[12px] opacity-60 mt-1">
                당신의 워크플로를 바꿀 앱
              </p>
            </div>
            <div className="text-6xl">🚀</div>
          </div>

          <h3 className="text-[17px] text-gray-800 font-semibold mb-3">
            인기 무료 앱
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {featured.map((app, i) => (
              <div
                key={app.name}
                className="flex items-center gap-3 p-3 bg-white rounded-xl"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                <span className="text-[13px] text-gray-400 w-4 flex-shrink-0">
                  {i + 1}
                </span>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: app.color + "20" }}
                >
                  {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800">
                    {app.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {app.category} · ⭐ {app.rating}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setInstalled((prev) =>
                      prev.includes(app.name)
                        ? prev.filter((n) => n !== app.name)
                        : [...prev, app.name]
                    )
                  }
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                  style={{
                    background: installed.includes(app.name)
                      ? "rgba(0,0,0,0.06)"
                      : "rgba(0,100,255,0.1)",
                    color: installed.includes(app.name) ? "#555" : "#0064ff",
                  }}
                >
                  {installed.includes(app.name)
                    ? "열기"
                    : app.price === "무료"
                      ? "받기"
                      : app.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mail Window ─────────────────────────────────────────────────────────────
function MailWindow() {
  const emails = [
    { from: "Apple", subject: "새로운 기능이 추가되었습니다", body: "macOS Sequoia의 새로운 기능을 확인해보세요.", time: "오전 9:30", unread: true, avatar: "🍎" },
    { from: "GitHub", subject: "새 풀 리퀘스트: feat/ui-update", body: "user123님이 새 풀 리퀘스트를 열었습니다.", time: "오전 8:15", unread: true, avatar: "🐙" },
    { from: "Slack", subject: "디자인 팀 · 새 메시지 3건", body: "김민준: 새 디자인 시안 확인해주세요 🎨", time: "어제", unread: false, avatar: "💬" },
    { from: "Google", subject: "보안 알림: 새 기기 로그인", body: "새로운 기기에서 귀하의 Google 계정에 로그인이 감지되었습니다.", time: "어제", unread: false, avatar: "🔍" },
    { from: "Netflix", subject: "이번 주 새로운 콘텐츠", body: "이번 주 Netflix에 추가된 새로운 콘텐츠를 확인하세요.", time: "2일 전", unread: false, avatar: "🎬" },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex h-full">
      <div
        className="w-52 flex-shrink-0 flex flex-col"
        style={{
          background: "rgba(238,238,238,0.95)",
          borderRight: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider mb-1">
            사서함
          </p>
          {[
            { name: "받은 편지함", icon: "📥", count: 2 },
            { name: "보낸 편지함", icon: "📤", count: 0 },
            { name: "중요 메일", icon: "⭐", count: 1 },
            { name: "휴지통", icon: "🗑️", count: 0 },
          ].map((m) => (
            <button
              key={m.name}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-black/5 transition-colors text-left"
            >
              <span className="text-base">{m.icon}</span>
              <span className="flex-1 text-[13px] text-gray-700">
                {m.name}
              </span>
              {m.count > 0 && (
                <span className="text-[11px] bg-blue-500 text-white rounded-full px-1.5 py-0.5">
                  {m.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="h-px bg-gray-200 mx-3" />
        <div className="flex-1 overflow-y-auto pt-1">
          {emails.map((e, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="w-full text-left px-3 py-2.5 transition-colors"
              style={{
                background:
                  selected === i ? "rgba(0,100,255,0.1)" : "transparent",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                {e.unread && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                )}
                {!e.unread && <div className="w-1.5 h-1.5 flex-shrink-0" />}
                <span className="text-[13px] font-semibold text-gray-800 flex-1 truncate">
                  {e.from}
                </span>
                <span className="text-[10px] text-gray-400 flex-shrink-0">
                  {e.time}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 truncate pl-3.5">
                {e.subject}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0" style={{ background: "white" }}>
        {emails[selected] && (
          <>
            <div
              className="px-6 pt-5 pb-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <h2 className="text-[18px] text-gray-900 mb-3">
                {emails[selected].subject}
              </h2>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                >
                  {emails[selected].avatar}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-gray-800">
                    {emails[selected].from}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    받는 사람: 나 &lt;user@icloud.com&gt;
                  </p>
                </div>
                <span className="text-[11px] text-gray-400">
                  {emails[selected].time}
                </span>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                {emails[selected].body}
              </p>
              <div
                className="mt-6 pt-6"
                style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
              >
                <button
                  className="px-4 py-2 rounded-lg text-[13px] text-white font-medium"
                  style={{ background: "#1d7af5" }}
                >
                  답장
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── App types ────────────────────────────────────────────────────────────────
type AppId = "finder" | "safari" | "notes" | "terminal" | "appstore" | "mail";

interface AppWindow {
  id: AppId;
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
}

const APP_CONFIG: Record<
  AppId,
  { title: string; w: number; h: number; x: number; y: number }
> = {
  finder: { title: "Finder", w: 720, h: 480, x: 80, y: 60 },
  safari: { title: "Safari", w: 740, h: 540, x: 120, y: 80 },
  notes: { title: "메모", w: 620, h: 460, x: 160, y: 70 },
  terminal: { title: "터미널", w: 600, h: 420, x: 200, y: 90 },
  appstore: { title: "App Store", w: 700, h: 500, x: 140, y: 80 },
  mail: { title: "Mail", w: 720, h: 520, x: 100, y: 70 },
};

const WIDGET_POSITIONS: Record<string, { x: number; y: number }> = {
  clock: { x: 40, y: 60 },
  weather: { x: 40, y: 220 },
  calendar: { x: 40, y: 520 },
  notes: { x: 330, y: 60 },
  system: { x: 330, y: 280 },
};

const WALLPAPER =
  "https://images.unsplash.com/photo-1729892382697-96b7892e1278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNvcyUyMG1vbnRlcmV5JTIwd2FsbHBhcGVyJTIwbW91bnRhaW5zJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzc1NjI3ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080";

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const zCounter = useRef(100);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [widgetPickerOpen, setWidgetPickerOpen] = useState(false);
  const [activeApp, setActiveApp] = useState("Finder");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [widgets, setWidgets] = useState<WidgetInstance[]>([
    { id: "clock-1", type: "clock", ...WIDGET_POSITIONS.clock },
    { id: "weather-1", type: "weather", ...WIDGET_POSITIONS.weather },
  ]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === " ") {
        e.preventDefault();
        setSpotlightOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const getTopZ = () => {
    zCounter.current += 1;
    return zCounter.current;
  };

  const openApp = useCallback(
    (id: AppId) => {
      const z = getTopZ();
      setWindows((prev) => {
        const ex = prev.find((w) => w.id === id);
        if (ex)
          return prev.map((w) =>
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: z }
              : w
          );
        return [...prev, { id, zIndex: z, isOpen: true, isMinimized: false }];
      });
      setActiveApp(APP_CONFIG[id].title);
    },
    []
  );

  const closeApp = (id: AppId) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));
  const minimizeApp = (id: AppId) =>
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  const focusApp = (id: AppId) => {
    const z = getTopZ();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w))
    );
    setActiveApp(APP_CONFIG[id].title);
  };

  const isDockOpen = (id: AppId) =>
    windows.some((w) => w.id === id && w.isOpen);

  const dockApps = [
    {
      id: "finder",
      name: "Finder",
      icon: <FinderIcon />,
      color: "transparent",
      isOpen: isDockOpen("finder"),
    },
    {
      id: "safari",
      name: "Safari",
      icon: <SafariIcon />,
      color: "transparent",
      isOpen: isDockOpen("safari"),
    },
    {
      id: "notes",
      name: "메모",
      icon: <NotesIcon />,
      color: "transparent",
      isOpen: isDockOpen("notes"),
    },
    {
      id: "terminal",
      name: "터미널",
      icon: <TerminalIcon />,
      color: "transparent",
      isOpen: isDockOpen("terminal"),
    },
    { id: "sep1", name: "", icon: null, color: "", isSeparator: true },
    {
      id: "appstore",
      name: "App Store",
      icon: <AppStoreIcon />,
      color: "transparent",
      isOpen: isDockOpen("appstore"),
    },
    {
      id: "mail",
      name: "Mail",
      icon: <MailIcon />,
      color: "transparent",
      isOpen: isDockOpen("mail"),
    },
    { id: "sep2", name: "", icon: null, color: "", isSeparator: true },
    {
      id: "trash",
      name: "휴지통",
      icon: <TrashIcon />,
      color: "transparent",
      isOpen: false,
    },
  ];

  const handleDockClick = (id: string) => {
    if (["sep1", "sep2", "trash"].includes(id)) return;
    const win = windows.find((w) => w.id === id);
    if (win?.isMinimized)
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
      );
    else if (win?.isOpen) focusApp(id as AppId);
    else openApp(id as AppId);
  };

  const renderContent = (id: AppId) => {
    switch (id) {
      case "finder":
        return <FinderWindow />;
      case "safari":
        return <SafariWindow />;
      case "notes":
        return <NotesWindow />;
      case "terminal":
        return <TerminalWindow />;
      case "appstore":
        return <AppStoreWindow />;
      case "mail":
        return <MailWindow />;
    }
  };

  // Widget management
  const addWidget = (type: string) => {
    const already = widgets.find((w) => w.type === type);
    if (already) return;
    const pos = WIDGET_POSITIONS[type] ?? { x: 100, y: 100 };
    setWidgets((prev) => [
      ...prev,
      { id: `${type}-${Date.now()}`, type, x: pos.x, y: pos.y },
    ]);
  };
  const removeWidget = (id: string) =>
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  const activeWidgetTypes = widgets.map((w) => w.type);

  const isMobileView =
    typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        backgroundImage: `url(${WALLPAPER})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        setContextMenu(null);
        setControlCenterOpen(false);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* Wallpaper overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.06)" }}
      />

      {/* Menu Bar */}
      <MenuBar
        onSpotlight={() => setSpotlightOpen(true)}
        onControlCenter={() => setControlCenterOpen((v) => !v)}
        activeApp={activeApp}
      />

      {/* Control Center */}
      <ControlCenter
        isOpen={controlCenterOpen}
        onClose={() => setControlCenterOpen(false)}
      />

      {/* Desktop Widgets */}
      <Widgets widgets={widgets} onRemove={removeWidget} />

      {/* Add Widget Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setWidgetPickerOpen((v) => !v);
        }}
        className="fixed bottom-24 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[12px] font-medium shadow-lg hover:scale-105 active:scale-95 transition-transform"
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Plus size={13} />
        위젯
      </button>

      {/* Widget Picker */}
      <WidgetPicker
        isOpen={widgetPickerOpen}
        onClose={() => setWidgetPickerOpen(false)}
        onAdd={addWidget}
        active={activeWidgetTypes}
      />

      {/* Mobile grid */}
      {isMobileView && (
        <div className="absolute inset-0 top-7 bottom-24 flex flex-col items-center justify-center px-6">
          <div className="grid grid-cols-4 gap-5">
            {(
              [
                "finder",
                "safari",
                "notes",
                "terminal",
                "appstore",
                "mail",
              ] as AppId[]
            ).map((id) => (
              <button
                key={id}
                onClick={() => openApp(id)}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-14 h-14 rounded-[22%] overflow-hidden shadow-xl">
                  {dockApps.find((a) => a.id === id)?.icon}
                </div>
                <span
                  className="text-white text-[10px] font-medium"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  {APP_CONFIG[id].title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Windows */}
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((win) => {
          const cfg = APP_CONFIG[win.id];
          const mv = typeof window !== "undefined" && window.innerWidth < 640;
          const topWin = windows.reduce(
            (max, w) => (w.zIndex > max.zIndex ? w : max),
            windows[0]
          );
          return (
            <Window
              key={win.id}
              id={win.id}
              title={cfg.title}
              initialX={mv ? 0 : cfg.x}
              initialY={mv ? 28 : cfg.y}
              initialW={mv ? window.innerWidth : cfg.w}
              initialH={mv ? window.innerHeight - 108 : cfg.h}
              isActive={topWin?.id === win.id}
              isMinimized={win.isMinimized}
              zIndex={win.zIndex}
              onFocus={() => focusApp(win.id)}
              onClose={() => closeApp(win.id)}
              onMinimize={() => minimizeApp(win.id)}
            >
              {renderContent(win.id)}
            </Window>
          );
        })}

      {/* Spotlight */}
      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={(id) => openApp(id as AppId)}
      />

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[200] w-56 rounded-xl overflow-hidden py-1"
          style={{
            left: Math.min(contextMenu.x, window.innerWidth - 230),
            top: Math.min(contextMenu.y, window.innerHeight - 260),
            background: "rgba(238,238,238,0.94)",
            backdropFilter: "blur(40px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {(
            [
              ["새 폴더", () => {}],
              null,
              ["정보 가져오기", () => {}],
              ["배경화면 변경...", () => {}],
              null,
              ["위젯 추가", () => setWidgetPickerOpen(true)],
              ["Spotlight 검색", () => setSpotlightOpen(true)],
              null,
              ["시스템 환경설정...", () => {}],
            ] as ([string, () => void] | null)[]
          ).map((item, i) =>
            item === null ? (
              <div key={i} className="h-px bg-gray-300/60 mx-2 my-1" />
            ) : (
              <button
                key={i}
                className="w-full text-left px-4 py-[5px] text-[13px] text-gray-800 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  item[1]();
                  setContextMenu(null);
                }}
              >
                {item[0]}
              </button>
            )
          )}
        </div>
      )}

      {/* Dock */}
      <Dock apps={dockApps} onAppClick={handleDockClick} />
    </div>
  );
}
