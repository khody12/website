"use client";

import React, {useState, useEffect} from 'react';

// This is from typescript and adds the static typing feature.
interface TypingAnimationProps {
    text:string; // no question mark, it's a mandatory value.
    speed?: number;
    className?: string;
    onComplete?: () => void;
} // if you want to be considered a TypingANimationProps object, you must have a key named text.
// and you can ahve keys named speed, className, and onCOmplete.


export default function TypingAnimation({
    text,
    speed = 100,
    className = "",
    onComplete,
}: TypingAnimationProps) { // Syntax used here with {} destructure then : TypignAnimationProps means
    // JS destructuring with {} pulls out properly associated with text and 
    //puts that value in a local var called text

    // that object being received must match the blueprint given above. 
     
    // These are react hooks.
    // stores what's shown on screen. Starts out empty

    //    **** IMPORTANT *****
    // useState returns the current state value and a setter function to update that value.

    const [displayedText, setDisplayedText] = useState('');
    // Keep tracks of the character we are about to add.
    const [currentIndex, setCurrentIndex] = useState(0);

    // 'useEffect runs our typing logic. It runs when 'currentIndex' changes.

    useEffect(() => {
        if (currentIndex < text.length) {
            // Set a timer (setTimeout). After 'speed' milliseconds.
            const timeoutId = setTimeout(() => {
                // add the next char to 'displayedText'
                setDisplayedText((prevText) => prevText + text[currentIndex]);
                // and move to the next char index, triggering the useEffect again. 
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, speed);

            // Clean up function
            // if component unloads before the timer finishes, clear it
            // prevents error/memleaks.

            return () => clearTimeout(timeoutId);

        } else if (onComplete) {
            // If we finished typing and onComplete funct was provided.
            // wait some time.
            const completeTimeout = setTimeout(onComplete, 500);
            return () => clearTimeout(completeTimeout)
        }

        // The [currentIndex, text, speed, onComplete] array tells React:
        // "Only re-run this effect if one of these values changes."
    }, [currentIndex, text, speed, onComplete]);

    return (
        //
        <div className={`font-mono whitespace-nowrap ${className}`}>
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block bg-current w-3 h-[1em] ml-1 animate-pulse"></span>
            )}
        </div>
    );
}