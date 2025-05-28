"use client"; // makes it a client component. which is what we need when we have things like
// user interaction via buttons forms dropdowns, when we use state management
// browser apis like localStorage
import React, { useState } from 'react';
import IntroScreen from '@/components/sections/IntroScreen';
import HorizontalNav from '@/components/layout/HorizontalNav';
import {motion, AnimatePresence } from 'framer-motion';

function LandingPageContent() {
  return (
    <div className="flex-grow p-4 md:p-8 text-center"> {/* This will be styled much more! */}
      <h1 className="text-5xl font-bold mb-6">Hi, I'm Eric!</h1>
      <p className="text-xl mb-4">
        A quick, engaging intro to me. This is where the cool 3D, animations, and imagery will live!
      </p>
      {/* Placeholder for interactive elements or visuals */}
      <div className="my-8 p-10 bg-neutral-800 rounded-lg shadow-xl">
        [Placeholder for a sick 3D interactive element or animation]
      </div>
      <p>More brief info about my core skills or passion...</p>
    </div>
  );
}

export default function Home() {
  // state variable called showIntro which starts at true
  const [showIntro, setShowIntro] = useState(true);

  // Function to handle completion
  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Render logic
  if (showIntro) {
    return (
      <AnimatePresence mode='wait'>
        <motion.div
          key="intro"
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <IntroScreen onComplete={handleIntroComplete} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // When intro is done, render the actual landing page content
  // This content will be wrapped by RootLayout which includes HorizontalNav and Footer
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.0, delay: 0.2 } }}
      className="flex flex-col flex-grow" // This page's content area
    >
      <LandingPageContent />
    </motion.div>
  );
}

