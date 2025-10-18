export function SummaryList({ items }) {
    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Summary</h4>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-500 dark:text-green-400 mr-2">●</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}