import {CardIcon} from "./CardIcon.jsx";
import {Metric} from "./Metric.jsx";
import {Badge} from "./Badge.jsx";
import {SummaryList} from "./SummaryList.jsx";

export default function BenchmarkCard({
                                          modelName,
                                          variant = "baseline",
                                          metrics = [],
                                          summaryItems = []
                                      }) {
    const isOptimized = variant === "optimized";

    return (
        <div className={`
      max-w-sm p-6 rounded-xl border-2 transition-all duration-300
      ${isOptimized
            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }
    `}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <CardIcon variant={variant} />
                    <h3 className="font-bold text-gray-900 dark:text-white">{modelName}</h3>
                </div>
                <Badge variant={variant}>
                    {isOptimized ? "Optimized" : "Baseline"}
                </Badge>
            </div>

            {/* Metrics */}
            <div>
                {metrics.map((metric, index) => (
                    <Metric
                        key={index}
                        label={metric.label}
                        value={metric.value}
                        unit={metric.unit}
                        improvement={metric.improvement}
                        maxValue={metric.maxValue}
                        variant={variant}
                    />
                ))}
            </div>
            {/* Summary */}
            {summaryItems.length > 0 && <SummaryList items={summaryItems} />}
        </div>
    );
}
