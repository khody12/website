"use client"; // makes it a client component. which is what we need when we have things like
// user interaction via buttons forms dropdowns, when we use state management
// browser apis like localStorage
import React, { useState } from 'react';
import IntroScreen from '@/components/sections/IntroScreen';
import {motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // state variable called showIntro which starts at true
  const [showIntro, setShowIntro] = useState(true);

  // Function to handle completion
  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Render logic
  return (
    <main>
      <AnimatePresence mode='wait'>
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0.8}}}
            >
              <IntroScreen onComplete={handleIntroComplete} />

            </motion.div>
          
        ) : (
          <motion.div
              key="main" // <-- Unique key
              initial={{ opacity: 0 }} // Start invisible
              animate={{ opacity: 1, transition: { duration: 1.0, delay: 0.5 } }} // <-- Fade in after a short delay
              exit={{ opacity: 0 }} // (In case you ever switch away again)
              className="p-10 text-center" // Your main site styles will go here
            >
              <h1 className="text-4xl font-bold">Main Site Layout Goes Here!</h1>
              <p className="mt-4">This is where your vertical nav and sections will appear.</p>
              {/* TODO: Add VerticalNav and Content Sections here */}
            </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
