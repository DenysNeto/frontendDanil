
// Metric Component (displays a single metric with progress bar)
export function Metric({
                           label,
                           value,
                           unit = "",
                           improvement = null,
                           maxValue = 100,
                           variant = "baseline"
                       }) {
    const percentage = typeof value === 'number' ? (value / maxValue) * 100 : parseFloat(value);
    const barColor = variant === "baseline"
        ? "bg-gray-300 dark:bg-gray-600"
        : "bg-blue-500 dark:bg-blue-600";

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {value}{unit}
        </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={`${barColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>
            {improvement && (
                <div className={`text-xs mt-1 font-medium ${
                    improvement.startsWith('↑') || improvement.startsWith('+')
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-blue-600 dark:text-blue-400'
                }`}>
                    {improvement}
                </div>
            )}
        </div>
    );
}