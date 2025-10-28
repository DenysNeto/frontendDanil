import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  onSelect = ()=>{},
  children,
  className,
  ariaLabel,
  type = "button",
  ...rest
}) {
  const isDisabled = disabled || loading;

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    secondary: "cursor-pointer bg-neutral-900 text-white hover:text-[#51FFA3] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.15)] transition-shadow duration-600 ",
    outlined: " text-white border border-[#51FFA3] hover:text-[#51FFA3] transition-colors duration-300",
    ghost: "bg-transparent text-emerald-500 border border-emerald-500 hover:bg-emerald-50",
    info: " text-black-500  hover:text-blue-300 !p-0",
    // 3-layer shadow example
    shadowDemo: "bg-blue-500 text-white hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.15)] transition-shadow duration-600",
  };

  const sizeStyles = {
    sm: "h-8  px-6 py-3 text-sm ",
    md: "h-10 px-6 py-3 text-base",
    lg: "h-12 px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onSelect}
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      ) }
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}
      <span className="truncate">{children}</span>
    </button>
  );
}