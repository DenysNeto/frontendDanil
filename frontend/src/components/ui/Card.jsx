import React from "react";
import Divider from "./Divider.jsx";

export default function Card({
                                 id,
                                 title,
                                 description,
                                 imageUrl,
                                 selected = false,
                                 comingSoon = false,
                                 onSelect,
                             }) {
    const handleClick = () => {
        if (!comingSoon) {
            onSelect?.(id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`
        w-full max-w-md mx-auto relative
        cursor-pointer max-w-sm bg-white/30 dark:bg-gray-800/30 backdrop-blur-md
        border rounded-xl overflow-hidden transform
        transition-all duration-300 ease-in-out
        ${comingSoon ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-lg"}
        ${selected && !comingSoon
                ? "border-blue-500 shadow-[0_0_20px_8px_rgba(59,130,246,0.5)]"
                : "border-white/20 dark:border-gray-700/30"}
      `}
        >
            {/* Checkmark overlay when selected */}
            {selected && !comingSoon && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    ✓
                </div>
            )}

            {comingSoon && (
                <div
                    className="absolute top-2 left-2
            bg-yellow-400 dark:bg-yellow-600
            text-white text-xs font-semibold
            px-2 py-1 rounded shadow-md"
                >
                    Coming Soon
                </div>
            )}

            {/* Image / Icon section */}
            {imageUrl && (
                <div
                    className="w-full h-24 flex items-center justify-center"
                    style={{ backgroundColor: imageUrl.bg }}
                >
                    <div
                        className="w-18 h-18 rounded-2xl flex items-center justify-center text-6xl font-bold"
                        style={{ backgroundColor: imageUrl.iconBg, color: imageUrl.color }}
                    >
                        {imageUrl.icon}
                    </div>
                </div>
            )}

            {/* Text content */}
            <div className="p-6 pt-2">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 drop-shadow-sm">
                    {title}
                </h3>
                <Divider
                    spacing="sm"
                    className="border-t border-gray-200 dark:border-gray-700/30"
                />
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-2">
                    {description}
                </p>
            </div>
        </div>
    );
}
