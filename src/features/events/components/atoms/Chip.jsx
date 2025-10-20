export function Chip({ label, selected, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className={"rounded-full border px-3 py-1 text-sm transition " + (selected ? "bg-gray-900 text-white" : "hover:bg-gray-100")} aria-pressed={selected}>
      {label}
    </button>
  );
}
