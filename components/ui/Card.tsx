"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: "default" | "paper" | "glass";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", children, ...props }, ref) => {
        const variants = {
            default: "bg-retro-white border-2 border-retro-gray shadow-brutal",
            paper: "bg-tan border-2 border-retro-gray shadow-brutal-sm",
            glass: "bg-white/90 backdrop-blur-sm border-2 border-retro-gray shadow-brutal",
        };

        return (
            <motion.div
                ref={ref}
                className={cn("rounded-none p-6 relative overflow-hidden", variants[variant], className)}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";
