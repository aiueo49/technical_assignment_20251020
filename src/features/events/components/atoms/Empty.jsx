export function Empty({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border p-10 text-center">
      <div className="mb-2 text-xl font-semibold">{title}</div>
      <p className="mb-6 text-gray-500">{hint}</p>
      {action}
    </div>
  );
}
