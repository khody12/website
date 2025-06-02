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

    const text_pt1 = "Hey there!";
    const text_pt2 = " Come learn a little bit about me.";
    const fullText = text_pt1 + text_pt2;
    const speed = 40;
    const pauseDuration = 400

    //

    useEffect(() => {
        if (isPaused) return;
        if (currentIndex < fullText.length) {
            // Set a timer (setTimeout). After 'speed' milliseconds.
            //set time out takes in a callback function, we define it as the first parameter. we then pass in speed as the time of delay.
            const timeoutId = setTimeout(() => {    // first arg is the callback function we define, second is speed.
                // add the next char to 'displayedText'
                setDisplayedText((prevText) => prevText + fullText[currentIndex]); // we dont need {} here because its a one line update thats just a return. 
                // and move to the next char index, triggering the useEffect again. 
                setCurrentIndex((prevIndex) => prevIndex + 1);

                if (currentIndex + 1 === text_pt1.length) {
                    setIsPaused(true);

                    setTimeout(() => { //nested timeout, does the same thing, callback function just sets paused to False
                        // after timeout is complete. 
                        setIsPaused(false);
                    }, pauseDuration);
                }
            }, speed); // SetTimeout is a built in JS function that schedules a funct to run after a delay
            // the function is what we pass in via {} and the delay is speed. 

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
        // The [currentIndex, text, speed, onComplete, etc] array tells React:
        // "Only re-run this effect if one of these values changes."
    }, [currentIndex, fullText, speed, onComplete, isPaused, text_pt1.length, pauseDuration]);

    return (
        // Section: Dark, full height, centered.
        <section className="fixed inset-0 z-[100] flex flex-col justify-center items-center text-center p-8 bg-black text-white">
          {/* Typing Animation Display */}
          <div className="font-mono text-4xl md:text-6xl text-black-400 mb-8">
            {displayedText}
            {/* Blinking Cursor (only shows while typing) */}
            {currentIndex < fullText.length && (
               <span className="inline-block bg-current w-3 h-[1em] ml-1 animate-pulse"></span>
            )}
          </div>
        </section>
      );
    }