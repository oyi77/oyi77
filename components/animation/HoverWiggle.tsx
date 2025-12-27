"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverWiggleProps {
    children: ReactNode;
    rotation?: number;
    scale?: number;
}

export default function HoverWiggle({
    children,
    rotation = 3,
    scale = 1.05,
}: HoverWiggleProps) {
    return (
        <motion.div
            whileHover={{
                rotate: [0, -rotation, rotation, -rotation, rotation, 0],
                scale: scale,
                transition: {
                    rotate: {
                        duration: 0.4,
                        ease: "easeInOut",
                    },
                    scale: {
                        duration: 0.2,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
