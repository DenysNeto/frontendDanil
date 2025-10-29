export function Spinner({ size = "md",withText=false, className = "" }) {
    const sizes = {
        sm: "w-8 h-8 border-2",
        md: "w-12 h-12 border-3",
        lg: "w-16 h-16 border-4",
    };

    return (
        <div className={`${className}`}>
            <div className="relative flex flex-col items-center">
                <div className={`
          ${sizes[size]} rounded-full 
          border-gray-300 border-8 border-t-blue-500 dark:border-t-blue-600
          animate-spin mb-4
        `}></div>

        <div>
            
        {withText && <span>LOADING</span>}
        </div>


            </div>

        </div>
    );
}
