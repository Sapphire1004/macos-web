import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Search,
  Home,
  Download,
  Image,
  Music,
  Film,
  HardDrive,
} from "lucide-react";

const sidebarItems = [
  {
    section: "즐겨찾기",
    items: [
      { name: "AirDrop", icon: <span className="text-blue-500">📡</span> },
      { name: "최근 항목", icon: <span className="text-gray-500">🕐</span> },
      { name: "응용 프로그램", icon: <span>🗂️</span> },
      {
        name: "데스크탑",
        icon: <Home size={14} className="text-blue-400" />,
      },
      {
        name: "다운로드",
        icon: <Download size={14} className="text-blue-400" />,
      },
      { name: "사진", icon: <Image size={14} className="text-blue-400" /> },
      { name: "음악", icon: <Music size={14} className="text-blue-400" /> },
      { name: "동영상", icon: <Film size={14} className="text-blue-400" /> },
    ],
  },
  {
    section: "위치",
    items: [
      {
        name: "Macintosh HD",
        icon: <HardDrive size={14} className="text-gray-500" />,
      },
      { name: "네트워크", icon: <span className="text-gray-500">🌐</span> },
    ],
  },
  {
    section: "태그",
    items: [
      {
        name: "빨간색",
        icon: <div className="w-3 h-3 rounded-full bg-red-500" />,
      },
      {
        name: "주황색",
        icon: <div className="w-3 h-3 rounded-full bg-orange-400" />,
      },
      {
        name: "노란색",
        icon: <div className="w-3 h-3 rounded-full bg-yellow-400" />,
      },
      {
        name: "녹색",
        icon: <div className="w-3 h-3 rounded-full bg-green-500" />,
      },
      {
        name: "파란색",
        icon: <div className="w-3 h-3 rounded-full bg-blue-500" />,
      },
    ],
  },
];

const files = [
  {
    name: "사진",
    icon: "📸",
    type: "folder",
    modified: "오늘 오전 10:30",
    size: "-",
  },
  {
    name: "프로젝트",
    icon: "📁",
    type: "folder",
    modified: "어제",
    size: "-",
  },
  {
    name: "다운로드",
    icon: "📥",
    type: "folder",
    modified: "어제",
    size: "-",
  },
  {
    name: "문서",
    icon: "📄",
    type: "folder",
    modified: "2일 전",
    size: "-",
  },
  {
    name: "보고서.pdf",
    icon: "📕",
    type: "file",
    modified: "오늘 오전 9:12",
    size: "2.4 MB",
  },
  {
    name: "프레젠테이션.pptx",
    icon: "📊",
    type: "file",
    modified: "어제",
    size: "8.1 MB",
  },
  {
    name: "노트.txt",
    icon: "📝",
    type: "file",
    modified: "3일 전",
    size: "12 KB",
  },
  {
    name: "사진_001.jpg",
    icon: "🖼️",
    type: "file",
    modified: "지난주",
    size: "4.2 MB",
  },
  {
    name: "음악.mp3",
    icon: "🎵",
    type: "file",
    modified: "지난주",
    size: "6.8 MB",
  },
  {
    name: "영상.mp4",
    icon: "🎬",
    type: "file",
    modified: "지난달",
    size: "256 MB",
  },
];

export function FinderWindow() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [selected, setSelected] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("다운로드");
  const [searchValue, setSearchValue] = useState("");

  const filtered = searchValue
    ? files.filter((f) =>
        f.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : files;

  return (
    <div className="flex h-full" style={{ background: "#f5f5f5" }}>
      {/* Sidebar */}
      <div
        className="w-44 flex-shrink-0 flex flex-col pt-2 overflow-y-auto"
        style={{
          background: "rgba(235,235,235,0.9)",
          borderRight: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {sidebarItems.map((section) => (
          <div key={section.section} className="mb-2">
            <div className="px-3 py-1 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              {section.section}
            </div>
            {section.items.map((item) => (
              <button
                key={item.name}
                className="w-full flex items-center gap-2 px-3 py-1 rounded-md mx-1 transition-colors text-left"
                style={{
                  width: "calc(100% - 8px)",
                  background:
                    activeSection === item.name
                      ? "rgba(0,100,255,0.15)"
                      : "transparent",
                  color:
                    activeSection === item.name ? "#0064ff" : "#3d3d3d",
                }}
                onClick={() => setActiveSection(item.name)}
              >
                <span className="text-[13px] flex items-center">
                  {item.icon}
                </span>
                <span className="text-[12px] truncate">{item.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
          style={{
            background: "rgba(235,235,235,0.95)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <button className="p-1 rounded hover:bg-black/10 transition-colors text-gray-500">
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 rounded hover:bg-black/10 transition-colors text-gray-400">
            <ChevronRight size={16} />
          </button>

          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setView("grid")}
              className="p-1 rounded transition-colors"
              style={{
                background:
                  view === "grid" ? "rgba(0,0,0,0.12)" : "transparent",
              }}
            >
              <Grid size={15} className="text-gray-600" />
            </button>
            <button
              onClick={() => setView("list")}
              className="p-1 rounded transition-colors"
              style={{
                background:
                  view === "list" ? "rgba(0,0,0,0.12)" : "transparent",
              }}
            >
              <List size={15} className="text-gray-600" />
            </button>
          </div>

          <div
            className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: "rgba(0,0,0,0.08)" }}
          >
            <Search size={12} className="text-gray-400" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="검색"
              className="bg-transparent outline-none text-[12px] text-gray-700 w-24 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Path */}
        <div
          className="flex items-center gap-1 px-4 py-1.5 text-[11px] text-gray-500"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <span>Macintosh HD</span>
          <span>›</span>
          <span>사용자</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">사용자 폴더</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {view === "list" ? (
            <table className="w-full">
              <thead>
                <tr
                  className="text-[11px] text-gray-400"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <th className="text-left pb-1 font-medium pl-1">이름</th>
                  <th className="text-left pb-1 font-medium hidden sm:table-cell">
                    수정일
                  </th>
                  <th className="text-left pb-1 font-medium hidden sm:table-cell">
                    크기
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((file) => (
                  <tr
                    key={file.name}
                    className="cursor-pointer rounded"
                    style={{
                      background:
                        selected === file.name
                          ? "rgba(0,100,255,0.15)"
                          : "transparent",
                    }}
                    onClick={() => setSelected(file.name)}
                    onDoubleClick={() => setSelected(null)}
                  >
                    <td className="py-1 pl-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{file.icon}</span>
                        <span className="text-[13px] text-gray-800">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-1 text-[11px] text-gray-500 hidden sm:table-cell">
                      {file.modified}
                    </td>
                    <td className="py-1 text-[11px] text-gray-500 hidden sm:table-cell">
                      {file.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filtered.map((file) => (
                <button
                  key={file.name}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors"
                  style={{
                    background:
                      selected === file.name
                        ? "rgba(0,100,255,0.15)"
                        : "transparent",
                  }}
                  onClick={() => setSelected(file.name)}
                >
                  <span className="text-4xl">{file.icon}</span>
                  <span className="text-[11px] text-gray-700 text-center leading-tight">
                    {file.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div
          className="px-4 py-1.5 text-[11px] text-gray-500 flex justify-between"
          style={{
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "rgba(240,240,240,0.5)",
          }}
        >
          <span>{filtered.length}개의 항목</span>
          <span>256 GB 여유</span>
        </div>
      </div>
    </div>
  );
}
