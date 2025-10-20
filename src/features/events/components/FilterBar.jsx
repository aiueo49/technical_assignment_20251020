import { Chip } from "./atoms/Chip";

export function FilterBar({ query, setQuery, selectedCats, toggleCat, dateScope, setDateScope, sort, setSort, categories, showFavoritesOnly, setShowFavoritesOnly }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <input className="rounded-xl border px-3 py-2" placeholder="キーワード検索（タイトル・場所）" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="検索" />
        <select className="rounded-xl border px-3 py-2" value={dateScope} onChange={(e) => setDateScope(e.target.value)} aria-label="期間">
          <option value="upcoming">今後のイベント</option>
          <option value="all">すべて</option>
          <option value="past">終了したイベント</option>
        </select>
        <select className="rounded-xl border px-3 py-2" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="並び替え">
          <option value="dateAsc">日付が近い順</option>
          <option value="dateDesc">日付が遠い順</option>
          <option value="popular">参加者が多い順</option>
          <option value="participationRate">参加率が高い順</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="favorites-only" 
            checked={showFavoritesOnly} 
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="favorites-only" className="text-sm font-medium text-gray-700">
            ★ お気に入りのみ表示
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c} label={c} selected={selectedCats.includes(c)} onToggle={() => toggleCat(c)} />
          ))}
        </div>
      </div>
    </div>
  );
}
