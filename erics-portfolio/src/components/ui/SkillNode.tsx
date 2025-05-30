"use client";
import { motion, MotionValue, useTransform, useMotionValue } from 'framer-motion';
import React, {RefObject, useState} from 'react';

interface SkillNodeProps {
    text:string;
    description?: string;
    index: number;
    mouseX: MotionValue<number> // motion value objects, allow us to track mouse ppos over entire container of all nodes.
    mouseY: MotionValue<number>
    containerWidth:number;
    containerHeight:number;
    dragConstraintsRef: RefObject<HTMLDivElement | null>;
}

export default function SkillNode({ text, description, index, mouseX, mouseY, containerWidth, containerHeight, dragConstraintsRef }: SkillNodeProps) {
  // calculating motion of the node.
  const x = useMotionValue(0); 
  // useMotionValue is a special state-like object from Framer that can be updated
  //without causing react to re-render the entire component.
  const y = useMotionValue(0);
  //nodes react to where your mouse is
  const parallaxStrengthX = 15 + (index % 3) * 1.5;
  const parallaxStrengthY = 15 + (index % 3) * 2;

  const inputXRange = containerWidth > 0 ? [0, containerWidth] : [0, 500];
  const inputYRange = containerHeight > 0 ? [0, containerHeight] : [0, 300];

  //subtle sway
  //useTransform(source, inputRange, outputRange)
  // when mouseX is at 0 i.e the left edge, childParallax x = - parallaxStrengthX, when mouseX is in the middle
  // it is zero parallax.
  //it will smoothly interpolate parallax values in between the left and right edge of the container.
  const childParallaxX = useTransform(mouseX, inputXRange, [-parallaxStrengthX, parallaxStrengthX]);
  const childParallaxY = useTransform(mouseY, inputYRange, [-parallaxStrengthY, parallaxStrengthY]);

  // Use transofmr is a hook that creates a new motion value. input => output
  //

  return (
    <motion.div // This outer div is DRAGGABLE
      initial={{ opacity: 0, scale: 0.5 }} // Initial animation for the whole node
      animate={{ opacity: 1, scale: 1 }}   // Target for initial animation
      transition={{ // Transitions for initial animation
        opacity: { duration: 0.5, delay: 0.6 + index * 0.1 },
        scale: { type: "spring", stiffness:100, damping:10, delay: 0.6 + index * 0.1 },
      }}
      // motion.div basically has this style shortcut, and it will watch these two motion variables
      //it subscribes to them, meaning it creates a listener and watches for any changes to the value inside that obj.
      // Framer Motion will directly update that speicfic elements style in the DOM and bypasses react re-render cycle.
      style={{
        x, // Drag will update this x
        y, // Drag will update this y
        // We put zIndex here for dragging if needed, or whileDrag
      }}
      drag
      dragConstraints={dragConstraintsRef}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 250, bounceDamping: 25 }}
      whileDrag={{ zIndex: 20 }} // Bring draggable element to front
    >
      {/* This inner div handles the PARALLAX and IDLE animations */}
      <motion.div
        className="bg-neutral-800/70 backdrop-blur-sm text-white p-4 md:p-6 rounded-xl shadow-2xl border border-neutral-700 cursor-grab active:cursor-grabbing"
        animate={{ // Continuous "idle" animation
          scale: [1, 1.03, 1],
        }}
        transition={{
          scale: { 
            duration: 2.5 + Math.random() * 1.5,
            repeat: Infinity, 
            repeatType: "mirror", 
            ease: "easeInOut",
            delay: Math.random() * 1 // Stagger start of idle pulse
          },
        }}
        whileHover={{ 
          scale: 1.10, // Hover scale on the inner content part
          boxShadow: "0px 0px 25px 0px rgba(56, 189, 248, 0.7)",
          borderColor: "rgba(56, 189, 248, 0.9)",
          // zIndex for hover can also be here, but whileDrag needs higher zIndex
        }}
        style={{
          x: childParallaxX, // Parallax is applied to the child
          y: childParallaxY, // Parallax is applied to the child
        }}
      >
        <h3 className="font-semibold text-md md:text-lg">{text}</h3>
        {description && <p className="text-xs md:text-sm text-neutral-400 mt-1">{description}</p>}
      </motion.div>
    </motion.div>
  );

}