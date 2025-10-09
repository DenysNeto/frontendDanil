export function LoadingMessage({ title, subtitle, className = "" }) {
    return (
        <div className={`text-center ${className}`}>
            {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>
            )}
            {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
}