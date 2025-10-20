import { Badge } from "./atoms/Badge";
import { clamp } from "../../events/lib/clamp";

export function EventCard({ ev, onToggleLike, onRSVP }) {
  const date = new Date(ev.date);
  const full = ev.attendees >= ev.capacity;
  const progress = clamp(Math.round((ev.attendees / ev.capacity) * 100), 0, 100);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight">{ev.title}</h3>
        <button className={"rounded-full border px-3 py-1 text-sm " + (ev.liked ? "bg-yellow-100" : "")} aria-pressed={ev.liked} onClick={onToggleLike}>
          {ev.liked ? "★ お気に入り" : "☆ お気に入り"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <Badge>{date.toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Badge>
        <Badge>📍 {ev.location}</Badge>
        {ev.categories.map((c) => (
          <Badge key={c}>{c}</Badge>
        ))}
      </div>

      <p className="text-sm text-gray-700">{ev.description}</p>

      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span>参加状況</span>
          <span>{ev.attendees}/{ev.capacity}（{progress}%）</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full bg-gray-900" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button onClick={onRSVP} className={"rounded-xl px-3 py-2 text-sm font-medium shadow transition " + (full ? "cursor-not-allowed bg-gray-200 text-gray-500" : "bg-gray-900 text-white hover:opacity-90")} disabled={full} aria-disabled={full}>
          {full ? "満員です" : "参加する（1名追加）"}
        </button>
      </div>
    </div>
  );
}
