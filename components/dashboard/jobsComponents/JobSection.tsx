export default function JobSection({
  title,
  items,
}: {
  title: string;
  items?: Record<string, string>;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 h-60 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {title}
      </h3>

      <ul className="space-y-2 list-disc list-inside text-sm text-gray-600 overflow-y-auto pr-1">
        {items
          ? Object.values(items).map((item, index) => (
              <li key={index}>{item}</li>
            ))
          : <li className="italic text-gray-400">No data</li>
        }
      </ul>
    </div>
  );
}
