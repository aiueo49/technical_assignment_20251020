import { useEffect, useRef, useState } from "react";
import { Chip } from "./atoms/Chip";
import { ALL_CATEGORIES } from "../constants";
import { todayISO } from "../lib/date";

export function EventFormModal({ open, onClose, onSubmit, defaults }) {
  const ref = useRef(null);
  useEffect(() => { if (open) setTimeout(() => ref.current?.focus(), 0); }, [open]);

  const [form, setForm] = useState(defaults || { title: "", date: todayISO() + "T10:00", location: "", categories: [], description: "", capacity: 20 });
  useEffect(() => { if (defaults) setForm(defaults); }, [defaults]);

  const toggleCategory = (cat) => setForm((f) => ({ ...f, categories: f.categories.includes(cat) ? f.categories.filter((c) => c !== cat) : [...f.categories, cat] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("タイトルは必須です");
    if (!form.location.trim()) return alert("場所は必須です");
    if (!form.date) return alert("日時を入力してください");
    onSubmit({ ...form });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">イベント作成</h2>
          <button className="rounded-full px-3 py-1 text-sm hover:bg-gray-100" onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">タイトル *</span>
            <input ref={ref} className="rounded-xl border px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="例）地域ミニコンサート" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium">日時 *</span>
              <input type="datetime-local" className="rounded-xl border px-3 py-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">定員 *</span>
              <input type="number" min={1} className="rounded-xl border px-3 py-2" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value || 1) })} />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-medium">場所 *</span>
            <input className="rounded-xl border px-3 py-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="例）〇〇区 △△センター" />
          </label>

          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">カテゴリ（複数選択可）</legend>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((c) => (
                <Chip key={c} label={c} selected={form.categories.includes(c)} onToggle={() => toggleCategory(c)} />
              ))}
            </div>
          </fieldset>

          <label className="grid gap-1">
            <span className="text-sm font-medium">説明</span>
            <textarea className="min-h-[100px] rounded-xl border px-3 py-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="イベントの概要・持ち物など" />
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="rounded-xl border px-4 py-2" onClick={onClose}>キャンセル</button>
            <button type="submit" className="rounded-xl bg-gray-900 px-4 py-2 font-medium text-white">追加する</button>
          </div>
        </form>
      </div>
    </div>
  );
}
