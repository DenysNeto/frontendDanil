export default function Header({title, description, className}) {
    return (
        <div className={`space-y-4 ${className}`}>
            <h1 className="text-3xl md:text-xl font-bold text-gray-900 dark:text-white">
               {title}
            </h1>
            <p className=" text-gray-600 dark:text-gray-400 max-w-3xl font-semibold text-gray-900 dark:text-gray-200">
                {description}
            </p>
        </div>
    );
}