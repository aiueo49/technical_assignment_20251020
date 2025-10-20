import { useMemo, useState } from "react";
import { FilterBar } from "../features/events/components/FilterBar";
import { EventCard } from "../features/events/components/EventCard";
import { EventFormModal } from "../features/events/components/EventFormModal";
import { EventCalendar } from "../features/events/components/EventCalendar";
import { Empty } from "../features/events/components/atoms/Empty";
import { useEvents } from "../features/events/hooks/useEvents";
import { ALL_CATEGORIES } from "../features/events/constants";

export default function CommunityEventsApp() {
  const { events, seedIfNeeded, toggleLike, rsvp, createEvent, resetAll } = useEvents();

  const [query, setQuery] = useState("");
  const [selectedCats, setSelectedCats] = useState([]);
  const [dateScope, setDateScope] = useState("upcoming"); // upcoming | all | past
  const [sort, setSort] = useState("dateAsc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 初期データ投入（初回のみ）
  seedIfNeeded();

  const toggleCat = (c) => setSelectedCats((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  const list = useMemo(() => {
    const now = Date.now();
    let filtered = events.filter((ev) => {
      const inQuery = `${ev.title} ${ev.location}`.toLowerCase().includes(query.toLowerCase());
      const inCats = selectedCats.length === 0 || selectedCats.every((c) => ev.categories.includes(c));
      const d = new Date(ev.date).getTime();
      const inScope = dateScope === "all" ? true : dateScope === "upcoming" ? d >= now : d < now;
      const isFavorite = !showFavoritesOnly || ev.liked;
      const isSelectedDate = !selectedDate || new Date(ev.date).toDateString() === selectedDate.toDateString();
      return inQuery && inCats && inScope && isFavorite && isSelectedDate;
    });
    filtered.sort((a, b) => {
      if (sort === "popular") return b.attendees - a.attendees;
      if (sort === "participationRate") {
        const rateA = a.capacity > 0 ? a.attendees / a.capacity : 0;
        const rateB = b.capacity > 0 ? b.attendees / b.capacity : 0;
        return rateB - rateA;
      }
      if (sort === "dateDesc") return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });
    return filtered;
  }, [events, query, selectedCats, dateScope, sort, showFavoritesOnly, selectedDate]);


  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">地域コミュニティイベント</h1>
          <p className="text-sm text-gray-600">参加したいイベントに出会える。</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border px-4 py-2 text-sm" onClick={resetAll} title="初期データに戻す">データをリセット</button>
          <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow" onClick={() => setOpen(true)}>＋ イベントを作成</button>
        </div>
      </header>


      <FilterBar
        query={query}
        setQuery={setQuery}
        selectedCats={selectedCats}
        toggleCat={toggleCat}
        dateScope={dateScope}
        setDateScope={setDateScope}
        sort={sort}
        setSort={setSort}
        categories={ALL_CATEGORIES}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <EventCalendar 
            events={events} 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate}
            className="sticky top-4"
          />
        </div>
        
        <div className="lg:col-span-2">
          {selectedDate && (
            <div className="mb-4 flex items-center justify-between rounded-xl bg-blue-50 p-3">
              <span className="text-sm font-medium text-blue-800">
                {selectedDate.toLocaleDateString('ja-JP', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}のイベント
              </span>
              <button 
                onClick={() => setSelectedDate(null)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ✕ 日付をクリア
              </button>
            </div>
          )}
          
          {list.length === 0 ? (
            <Empty title="条件に合うイベントが見つかりませんでした" hint="キーワードやカテゴリ、期間の条件を見直してみてください。" action={<button className="rounded-xl border px-4 py-2" onClick={() => { setQuery(""); setSelectedCats([]); setDateScope("upcoming"); setSort("dateAsc"); setShowFavoritesOnly(false); setSelectedDate(null); }}>条件をクリア</button>} />
          ) : (
            <div className="grid gap-3">
              {list.map((ev) => (
                <EventCard key={ev.id} ev={ev} onToggleLike={() => toggleLike(ev.id)} onRSVP={() => rsvp(ev.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="mt-10 text-center text-xs text-gray-500"><p>© 2025 Community Events (Demo). ローカル保存のみ（サーバー通信なし）。</p></footer>

      <EventFormModal open={open} onClose={() => setOpen(false)} onSubmit={(payload) => { createEvent(payload); setOpen(false); }} />
    </div>
  );
}
