import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

const suggestions = [
  {
    category: "응용 프로그램",
    items: [
      { id: "finder", name: "Finder", icon: "🗂️" },
      { id: "safari", name: "Safari", icon: "🧭" },
      { id: "notes", name: "메모", icon: "📝" },
      { id: "terminal", name: "터미널", icon: "⬛" },
      { id: "appstore", name: "App Store", icon: "🛍️" },
      { id: "mail", name: "Mail", icon: "✉️" },
    ],
  },
  {
    category: "최근 항목",
    items: [
      { id: "notes", name: "오늘의 할 일 목록.txt", icon: "📄" },
      { id: "finder", name: "다운로드", icon: "📁" },
    ],
  },
];

export function Spotlight({ isOpen, onClose, onOpenApp }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const allItems = suggestions.flatMap((s) => s.items);
  const filtered = query
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 6);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown")
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) {
        onOpenApp(filtered[selected].id);
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, filtered, selected, onClose, onOpenApp]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={onClose}
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      <div
        className="w-[90vw] max-w-[620px] rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
          animation: "slideDown 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200/50">
          <Search size={20} className="text-gray-500 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Spotlight 검색"
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-[17px]"
          />
        </div>

        {/* Results */}
        {filtered.length > 0 && (
          <div className="py-2 max-h-[50vh] overflow-y-auto">
            {!query
              ? suggestions.map((section) => (
                  <div key={section.category}>
                    <div className="px-5 py-1 text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                      {section.category}
                    </div>
                    {section.items.map((item, i) => {
                      const globalIndex = allItems.findIndex(
                        (a) => a === item
                      );
                      return (
                        <button
                          key={item.id + i}
                          className="w-full flex items-center gap-3 px-4 py-2 transition-colors text-left"
                          style={{
                            background:
                              selected === globalIndex
                                ? "rgba(0,106,255,0.85)"
                                : "transparent",
                            color:
                              selected === globalIndex ? "white" : "inherit",
                          }}
                          onMouseEnter={() => setSelected(globalIndex)}
                          onClick={() => {
                            onOpenApp(item.id);
                            onClose();
                          }}
                        >
                          <span className="text-2xl w-8 text-center">
                            {item.icon}
                          </span>
                          <span
                            className="text-[14px]"
                            style={{
                              color:
                                selected === globalIndex
                                  ? "white"
                                  : "#1a1a1a",
                            }}
                          >
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              : filtered.map((item, i) => (
                  <button
                    key={item.id + i}
                    className="w-full flex items-center gap-3 px-4 py-2 transition-colors text-left"
                    style={{
                      background:
                        selected === i
                          ? "rgba(0,106,255,0.85)"
                          : "transparent",
                    }}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => {
                      onOpenApp(item.id);
                      onClose();
                    }}
                  >
                    <span className="text-2xl w-8 text-center">
                      {item.icon}
                    </span>
                    <span
                      className="text-[14px]"
                      style={{ color: selected === i ? "white" : "#1a1a1a" }}
                    >
                      {item.name}
                    </span>
                  </button>
                ))}
          </div>
        )}

        {filtered.length === 0 && query && (
          <div className="py-8 text-center text-gray-500 text-[14px]">
            "{query}"에 대한 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
