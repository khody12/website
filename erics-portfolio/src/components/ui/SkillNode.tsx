"use client";
import { motion, MotionValue, useTransform } from 'framer-motion';
import React from 'react';

interface SkillNodeProps {
    text:string;
    description?: string;
    index: number;
    mouseX: MotionValue<number>
    mouseY: MotionValue<number>
    containerWidth:number;
    containerHeight:number;
}

export default function SkillNode({ text, description, index, mouseX, mouseY, containerWidth, containerHeight }: SkillNodeProps) {
    

    const parallaxStrengthX = 10 + (index % 3) * 5; // e.g., 10, 15, 20
    const parallaxStrengthY = 12 + (index % 3) * 6; // e.g., 12, 18, 24

    const inputXRange = containerWidth > 0 ? [0, containerWidth] : [0, 500]; // Default fallback
    const inputYRange = containerHeight > 0 ? [0, containerHeight] : [0, 300]; // Default fallback

    const moveX = useTransform(mouseX, inputXRange, [-parallaxStrengthX, parallaxStrengthX]);
    const moveY = useTransform(mouseY, inputYRange, [-parallaxStrengthY, parallaxStrengthY]);

    return(
        <motion.div
          className="bg-neutral-800/70 backdrop-blur-sm text-white p-4 md:p-6 rounded-xl shadow-2xl border border-neutral-700 cursor-pointer"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{
            opacity: 1,
            scale: [1, 1.03, 1]
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.6 + index * 0.1 },
            scale: { 
              duration: 2.5 + Math.random() * 1.5, // Slightly faster, more varied pulse
              repeat: Infinity, 
              repeatType: "mirror", 
              ease: "easeInOut",
              delay: 0.6 + index * 0.1 + Math.random() * 0.5 // Staggered start for pulse
            },
            // No x or y transition needed here for the continuous animate;
            // Framer Motion handles smoothing for style-driven motion values by default.
          }}
            whileHover={{ 
              scale: 1.5, 
              boxShadow: "0px 0px 20px 0px rgba(56, 189, 248, 0.6)", // Sky blue glow
              borderColor: "rgba(56, 189, 248, 0.8)",
              zIndex:10
            }}
            style={{ x: moveX, y: moveY }} // Apply parallax transforms if used
    >
      <h3 className="font-semibold text-md md:text-lg">{text}</h3>
      {description && <p className="text-xs md:text-sm text-neutral-400 mt-1">{description}</p>}
    </motion.div>
    )

}