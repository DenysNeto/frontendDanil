export function Spinner({ size = "md", className = "" }) {
    const sizes = {
        sm: "w-8 h-8 border-2",
        md: "w-12 h-12 border-3",
        lg: "w-16 h-16 border-4",
    };

    return (
        <div className={`${className}`}>
            <div className="relative inline-flex">
                <div className={`
          ${sizes[size]} rounded-full 
          border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400
          animate-spin
        `}></div>
            </div>
        </div>
    );
}
