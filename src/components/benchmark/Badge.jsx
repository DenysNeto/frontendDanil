export function Badge({ children, variant = "baseline", className = "" }) {
    const variants = {
        baseline: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
        optimized: "bg-blue-500 text-white"
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
    );
}