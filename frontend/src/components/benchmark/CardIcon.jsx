import {Target, Zap} from "lucide-react";

export function CardIcon({ variant = "baseline" }) {
    const Icon = variant === "baseline" ? Target : Zap;
    const colorClass = variant === "baseline"
        ? "text-gray-500 dark:text-gray-400"
        : "text-yellow-500 dark:text-yellow-400";

    return <Icon className={`w-5 h-5 ${colorClass}`} />;
}