import React from "react";
import { Plus } from "lucide-react"; // assuming you’re using lucide
import { ChevronRight } from "lucide-react"; // assuming you’re using lucide




const variantClasses = {
    default: "bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-600 text-white",
    success: "bg-green-500/80 hover:bg-green-500 text-white",
    warning: "bg-yellow-400/80 hover:bg-yellow-400 text-white",
    error: "bg-red-500/80 hover:bg-red-500 text-white",
};

export const Button= ({
                                                  variant = "default",
                                                  children,
                                                  className = "",
                                                  onClick,
    disabled,
    icon,iconAfter
                                              }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 
                  ${variantClasses[variant]} ${className}`}
        >
            {icon && <span className="w-5 h-5 mt-[-8px]">{icon}</span>}
            <span className="font-medium">{children}</span>
            {iconAfter && <span className="w-4 h-4 mt-[-8px]">{iconAfter}</span>}
        </button>
    );
};
