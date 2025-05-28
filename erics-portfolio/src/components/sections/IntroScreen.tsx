"use client";

import React, { useState, useEffect } from 'react';
import TypingAnimation from '@/components/ui/TypingAnimation';
import { motion } from 'framer-motion';

interface IntroScreenProps {
    onComplete: () => void;
}
export default function IntroScreen({ onComplete }: IntroScreenProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const text_pt1 = "Welcome,";
    const text_pt2 = " I'm Eric and this is my portfolio.";
    const fullText = text_pt1 + text_pt2;
    const speed = 125;
    const pauseDuration = 1500

    useEffect(() => {
        if (isPaused) return;
        if (currentIndex < fullText.length) {
            // Set a timer (setTimeout). After 'speed' milliseconds.
            const timeoutId = setTimeout(() => {
                // add the next char to 'displayedText'
                setDisplayedText((prevText) => prevText + fullText[currentIndex]);
                // and move to the next char index, triggering the useEffect again. 
                setCurrentIndex((prevIndex) => prevIndex + 1);

                if (currentIndex + 1 === text_pt1.length) {
                    setIsPaused(true);

                    setTimeout(() => {
                        setIsPaused(false);
                    }, pauseDuration);
                }
            }, speed);

            // Clean up function
            // if component unloads before the timer finishes, clear it
            // prevents error/memleaks.

            return () => clearTimeout(timeoutId);

        } else {
            // If we finished typing and onComplete funct was provided.
            // wait some time.
            const completeTimeout = setTimeout(onComplete, 1500);
            return () => clearTimeout(completeTimeout)
        }
        // The [currentIndex, text, speed, onComplete] array tells React:
        // "Only re-run this effect if one of these values changes."
    }, [currentIndex, fullText, speed, onComplete, isPaused, text_pt1.length, pauseDuration]);

    return (
        // Section: Dark, full height, centered.
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gray-900 text-white">
          {/* Typing Animation Display */}
          <div className="font-mono text-4xl md:text-6xl text-black-400 mb-8">
            {displayedText}
            {/* Blinking Cursor (only shows while typing) */}
            {currentIndex < fullText.length && (
               <span className="inline-block bg-current w-3 h-[1em] ml-1 animate-pulse"></span>
            )}
          </div>
          {/* We REMOVED the button and conditional rendering from here,
              because page.tsx will handle what comes next. */}
        </section>
      );
    }