import BenchmarkCard from "./BenchmarkCard.jsx";

export function BenchmarkComparison() {
    const baselineMetrics = [
        { label: "Latency", value: 842, unit: "ms", maxValue: 1000 },
        { label: "Throughput", value: 45, unit: " tok/s", maxValue: 200 },
        { label: "Accuracy", value: 85.1, unit: "%", maxValue: 100 },
        { label: "Cost per 1M tokens", value: 0.8, unit: "", maxValue: 1 }
    ];

    const optimizedMetrics = [
        { label: "Latency", value: 287, unit: "ms", improvement: "↑ 66% faster", maxValue: 1000 },
        { label: "Throughput", value: 132, unit: " tok/s", improvement: "↑ 193% improvement", maxValue: 200 },
        { label: "Accuracy", value: 87.3, unit: "%", improvement: "↑ +2.2% points", maxValue: 100 },
        { label: "Cost per 1M tokens", value: 0.48, unit: "", improvement: "↓ 40% cost reduction", maxValue: 1 }
    ];

    const summaryItems = [
        "3x faster inference speed",
        "40% cost savings",
        "Maintained accuracy"
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BenchmarkCard
                        modelName="GPT-OSS-120B"
                        variant="baseline"
                        metrics={baselineMetrics}
                    />
                    <BenchmarkCard
                        modelName="GPT-OSS-120B"
                        variant="optimized"
                        metrics={optimizedMetrics}
                        summaryItems={summaryItems}
                    />
                </div>
            </div>
        </div>
    );
}
