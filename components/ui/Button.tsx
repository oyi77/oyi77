"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn"; // Assuming cn is here, will verify

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary:
                "bg-retro-red text-white border-2 border-retro-gray shadow-brutal hover:shadow-brutal-hover active:shadow-brutal-active hover:-translate-y-0.5 active:translate-y-0.5",
            secondary:
                "bg-retro-white text-retro-gray border-2 border-retro-gray shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:shadow-brutal-sm active:translate-y-0.5",
            danger:
                "bg-red-500 text-white border-2 border-retro-gray shadow-brutal hover:shadow-brutal-hover active:shadow-brutal-active",
            ghost:
                "bg-transparent text-retro-gray hover:bg-retro-gray/5 border-2 border-transparent hover:border-retro-gray/20",
        };

        const sizes = {
            sm: "px-3 py-1 text-sm",
            md: "px-6 py-2.5 text-base",
            lg: "px-8 py-4 text-lg font-bold",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative inline-flex items-center justify-center font-bold transition-all duration-200 ease-out active:duration-75 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
