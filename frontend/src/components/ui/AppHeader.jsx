import React from "react";
import { Sun, Moon } from "lucide-react";

export default function AppHeader({
                                      isDarkMode = false,
                                      onThemeToggle,
                                  }) {
    return (
        <header
            className={`
        w-full backdrop-blur-xl border-b
        ${isDarkMode
                ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                : "bg-white/40 dark:bg-gray-900/40 border-white/20 shadow-md"
            }
      `}
        >
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Left section: Logo + Title */}
                <div className="flex items-center gap-3">
                    <img
                        src="/twodelta-logo.png"
                        alt="TwoDelta"
                        className="h-8 w-8 rounded-lg shadow-lg"
                    />
                    <span
                        className={`
              font-bold text-lg drop-shadow-sm
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}
                    >
            TwoDelta Demo
          </span>
                </div>

                {/* Right section: Theme Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onThemeToggle}
                        className={`
              p-2 rounded-lg transition-all duration-300
              border
              ${isDarkMode
                            ? "bg-gray-700/50 border-blue-400/40 hover:bg-gray-700/80 shadow-lg"
                            : "bg-white/30 border-white/20 hover:bg-white/50"
                        }
            `}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
