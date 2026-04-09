import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";

const initialNotes = [
  {
    id: 1,
    title: "오늘의 할 일",
    content:
      "☐ 코드 리뷰 완료하기\n☐ 회의 준비\n☐ 점심 약속 확인\n☑ 이메일 확인\n☑ 아침 운동",
    date: "오늘 오전 10:30",
    pinned: true,
  },
  {
    id: 2,
    title: "아이디어 노트",
    content:
      "새 프로젝트 아이디어:\n- macOS 스타일 UI 라이브러리\n- AI 기반 일정 관리 앱\n- 크로스 플랫폼 노트 앱",
    date: "어제",
    pinned: false,
  },
  {
    id: 3,
    title: "회의록 - 2026.04.07",
    content:
      "참석자: 김민준, 이서윤, 박지호\n\n주요 안건:\n1. Q2 목표 설정\n2. 신규 기능 우선순위 논의\n3. 출시 일정 확인",
    date: "어제",
    pinned: false,
  },
  {
    id: 4,
    title: "쇼핑 목록",
    content: "- 우유\n- 달걀\n- 빵\n- 커피\n- 과일 (사과, 바나나)\n- 채소",
    date: "2일 전",
    pinned: false,
  },
];

export function NotesWindow() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");

  const selectedNote = notes.find((n) => n.id === selectedId);

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "새 메모",
      content: "",
      date: "방금",
      pinned: false,
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) setSelectedId(notes[0]?.id || 0);
  };

  const updateContent = (content: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedId
          ? {
              ...n,
              content,
              title: content.split("\n")[0] || "새 메모",
              date: "방금",
            }
          : n
      )
    );
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-52 flex-shrink-0 flex flex-col"
        style={{
          background: "rgba(242,238,230,0.95)",
          borderRight: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <span className="text-[12px] text-gray-500 font-semibold">메모</span>
          <button
            onClick={addNote}
            className="p-1 rounded hover:bg-black/10 transition-colors"
          >
            <Plus size={14} className="text-gray-600" />
          </button>
        </div>

        <div className="px-2 py-1.5">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: "rgba(0,0,0,0.08)" }}
          >
            <Search size={11} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="검색"
              className="flex-1 bg-transparent outline-none text-[12px] text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {search === "" && notes.some((n) => n.pinned) && (
            <div className="px-3 py-1 text-[10px] text-gray-400 uppercase font-semibold">
              고정됨
            </div>
          )}
          {filtered
            .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
            .map((note) => (
              <button
                key={note.id}
                className="w-full text-left px-3 py-2 transition-colors group relative"
                style={{
                  background:
                    selectedId === note.id
                      ? "rgba(255,204,0,0.4)"
                      : "transparent",
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                }}
                onClick={() => setSelectedId(note.id)}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[13px] text-gray-800 font-medium truncate pr-4">
                    {note.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2
                      size={11}
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-gray-400">
                    {note.date}
                  </span>
                  <span className="text-[11px] text-gray-400 truncate">
                    {note.content.split("\n")[1] || note.content.slice(0, 30)}
                  </span>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* Editor */}
      <div
        className="flex-1 flex flex-col"
        style={{ background: "rgba(252,249,238,0.98)" }}
      >
        {selectedNote ? (
          <>
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-2">
                {["B", "I", "U"].map((fmt) => (
                  <button
                    key={fmt}
                    className="w-6 h-6 rounded flex items-center justify-center text-[12px] text-gray-600 hover:bg-black/10 font-medium transition-colors"
                  >
                    {fmt}
                  </button>
                ))}
                <div className="w-px h-4 bg-gray-300" />
                {["≡", "•", "#"].map((fmt) => (
                  <button
                    key={fmt}
                    className="w-6 h-6 rounded flex items-center justify-center text-[12px] text-gray-600 hover:bg-black/10 transition-colors"
                  >
                    {fmt}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-gray-400">
                {selectedNote.date}
              </span>
            </div>

            <textarea
              value={selectedNote.content}
              onChange={(e) => updateContent(e.target.value)}
              className="flex-1 p-5 bg-transparent outline-none resize-none text-[14px] text-gray-800 leading-relaxed"
              placeholder="메모를 입력하세요..."
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-[14px] text-gray-400">
                메모를 선택하거나 새 메모를 작성하세요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
