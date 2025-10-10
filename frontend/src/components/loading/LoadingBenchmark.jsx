import {Spinner} from "./Spinner.jsx";
import {LoadingMessage} from "./LoadingMessage.jsx";

export default function LoadingBenchmark({
                                             title = "Running Benchmark...",
                                             subtitle = "Testing baseline and optimized variants on HumanEval & MBPP",
                                             showCard = true,
                                             size = "md"
                                         }) {
    const content = (
        <div className="flex flex-col items-center justify-center py-12 px-6">
            <Spinner size={size} className="mb-6" />
            <LoadingMessage title={title} subtitle={subtitle} />
        </div>
    );

    if (showCard) {
        return (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                {content}
            </div>
        );
    }

    return content;
}