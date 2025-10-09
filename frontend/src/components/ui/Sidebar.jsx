// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
    Sun,
    Moon,
    Menu,
    Plus,
    Settings,
    MessageSquare,
    Search,
    BookOpen,
    FolderOpen,
    ChevronDown,
    LogOut,
    User,
    HelpCircle
} from "lucide-react";


export default function Sidebar({
                                    isDarkMode = false,
                                    onThemeToggle,
                                    onAddPrompt,
                                    onMenuClick
                                }) {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("new-chat");

    const menuItems = [
        { id: "settings", icon: Settings, label: "Settings", action: () => onMenuClick?.("new-chat") },

    ];

    const recentChats = [
        "Prompt1",
        "Prompt2",
        "Prompt3",
        "Prompt4",
        "Prompt5",
        "Prompt6",
        "Prompt7",

    ];

    const configMenuItems = [
        { id: "profile", icon: User, label: "Profile" },
        { id: "settings", icon: Settings, label: "Settings" },
        { id: "help", icon: HelpCircle, label: "Help & Support" },
        { id: "logout", icon: LogOut, label: "Logout", danger: true },
    ];

    return (
        <aside className="  bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30 flex flex-col shadow-2xl">
            <div className="p-4 border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Menu className="w-6 h-6 text-white" />
                        <img
                            src="/twodelta-logo.png"
                    alt=""
                            className="rounded-xl shadow-md"
                        />

                    </div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">TwoDelta Demo</span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={onThemeToggle}
                    className="p-2 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 border border-white/20 dark:border-gray-700/30"
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                        <Moon className="w-5 h-5 text-gray-700" />
                    )}
                </button>
            </div>

            {/* Add Prompt Button */}
            <div className="p-4">
                <button
                    onClick={onAddPrompt}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add New Prompt</span>
                </button>
            </div>

            {/* Menu Items */}
            <nav className="px-4 py-2 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveItem(item.id);
                                item.action();
                            }}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300 group
                ${isActive
                                ? "bg-blue-500/20 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 shadow-md"
                                : "hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-700 dark:text-gray-300"
                            }
              `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Recent Chats Section */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Recent Prompts
                </h3>
                <div className="space-y-1">
                    {recentChats.map((chat, index) => (
                        <button
                            key={index}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 truncate"
                        >
                            {chat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Configuration Menu */}
            {/*<div className="p-4 border-t border-white/20 dark:border-gray-700/30">*/}
            {/*    <button*/}
            {/*        onClick={() => setIsConfigOpen(!isConfigOpen)}*/}
            {/*        className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 text-gray-900 dark:text-white"*/}
            {/*    >*/}
            {/*        <div className="flex items-center gap-3">*/}
            {/*            <Settings className="w-5 h-5" />*/}
            {/*            <span className="font-medium">Configuration</span>*/}
            {/*        </div>*/}
            {/*        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isConfigOpen ? "rotate-180" : ""}`} />*/}
            {/*    </button>*/}

            {/*    /!* Configuration Dropdown *!/*/}
            {/*    {isConfigOpen && (*/}
            {/*        <div className="mt-2 space-y-1 bg-white/20 dark:bg-gray-800/20 rounded-lg p-2 border border-white/20 dark:border-gray-700/30">*/}
            {/*            {configMenuItems.map((item) => {*/}
            {/*                const Icon = item.icon;*/}
            {/*                return (*/}
            {/*                    <button*/}
            {/*                        key={item.id}*/}
            {/*                        className={`*/}
            {/*        w-full flex items-center gap-3 px-3 py-2 rounded-lg*/}
            {/*        transition-all duration-300*/}
            {/*        ${item.danger*/}
            {/*                            ? "hover:bg-red-500/20 text-red-600 dark:text-red-400"*/}
            {/*                            : "hover:bg-white/30 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"*/}
            {/*                        }*/}
            {/*      `}*/}
            {/*                    >*/}
            {/*                        <Icon className="w-4 h-4" />*/}
            {/*                        <span className="text-sm font-medium">{item.label}</span>*/}
            {/*                    </button>*/}
            {/*                );*/}
            {/*            })}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </aside>
    );
}