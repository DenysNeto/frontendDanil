// src/components/Divider.jsx
import React from "react";

export default function Divider({
                                    orientation = "horizontal", // "horizontal" or "vertical"
                                    className = "",
                                    spacing = "md", // "sm", "md", "lg", "xl"
                                    withText = false,
                                    text = "",
                                    textPosition = "center" // "left", "center", "right"
                                }) {
    const spacingClasses = {
        sm: "my-2",
        md: "my-4",
        lg: "my-6",
        xl: "my-8"
    };

    const verticalSpacingClasses = {
        sm: "mx-2",
        md: "mx-4",
        lg: "mx-6",
        xl: "mx-8"
    };

    if (orientation === "vertical") {
        return (
            <div className={`inline-block h-full ${verticalSpacingClasses[spacing]} ${className}`}>
                <div className="w-px h-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
        );
    }

    // Horizontal divider
    if (withText && text) {
        return (
            <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
                {textPosition !== "left" && (
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                )}
                <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
          {text}
        </span>
                {textPosition !== "right" && (
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                )}
            </div>
        );
    }

    return (
        <div className={`${spacingClasses[spacing]} ${className}`}>
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
        </div>
    );
}

export function DividerDashed({ className = "", spacing = "md" }) {
    return (
        <Divider
            className={`border-dashed ${className}`}
            spacing={spacing}
        />
    );
}

export function DividerDotted({ className = "", spacing = "md" }) {
    return (
        <Divider
            className={`border-dotted ${className}`}
            spacing={spacing}
        />
    );
}

export function DividerThick({ className = "", spacing = "md" }) {
    return (
        <div className={`my-${spacing === 'sm' ? '2' : spacing === 'lg' ? '6' : spacing === 'xl' ? '8' : '4'} ${className}`}>
            <div className="border-t-2 border-gray-300 dark:border-gray-600"></div>
        </div>
    );
}

export function DividerGradient({ className = "", spacing = "md" }) {
    return (
        <div className={`my-${spacing === 'sm' ? '2' : spacing === 'lg' ? '6' : spacing === 'xl' ? '8' : '4'} ${className}`}>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>
    );
}