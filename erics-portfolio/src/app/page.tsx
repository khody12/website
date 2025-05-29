"use client"; // makes it a client component. which is what we need when we have things like
// user interaction via buttons forms dropdowns, when we use state management
// browser apis like localStorage
import React, { useState, useRef, useEffect } from 'react';
import IntroScreen from '@/components/sections/IntroScreen';
import HorizontalNav from '@/components/layout/HorizontalNav';
import {motion, AnimatePresence, useMotionValue } from 'framer-motion';
import SkillNode from '@/components/ui/SkillNode';

function LandingPageContent() {
  const nodeData = [
    { id: 1, text: "React", description: "Building dynamic UIs" },
    { id: 2, text: "Next.js", description: "Full-stack Web Apps" },
    { id: 3, text: "TypeScript", description: "Strongly-typed JS" },
    { id: 4, text: "Python", description: "Data & Automation" },
    { id: 5, text: "Problem Solver", description: "Analytical Mindset" },
    { id: 6, text: "UI/UX Passion", description: "User-centric Design" },
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [containerDims, setContainerDims] = useState({width: 0, height:0});
  const constellationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (constellationRef.current) {
      setContainerDims({
        width:constellationRef.current.offsetWidth,
        height: constellationRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (constellationRef.current) {
      const rect = constellationRef.current.getBoundingClientRect();

      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center p-4 md:p-8 text-center relative overflow-hidden">
      {/* Main Text */}
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-4 text-white z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }} // Stagger after main page fades in
      >
        Hi, I'm Eric!
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl text-neutral-300 mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        A quick, engaging intro to me. Welcome to my digital space.
      </motion.p>

      
      {/* Constellation Container - This is what tracks mouse movement */}
      <div
        ref={constellationRef}
        onMouseMove={handleMouseMove}
        className="relative w-4/5 mt-8 mb-8 h-96 md:h-[550px] 
                   flex flex-wrap justify-center items-center content-center 
                   gap-6 md:gap-8 p-4"
      >
        {nodeData.map((node, index) => (
            <SkillNode
              key={node.id}
              text={node.text}
              description={node.description}
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
              containerHeight={containerDims.height}
              containerWidth={containerDims.width}
            />
        ))}
      </div>

      <motion.p 
        className="text-lg text-neutral-400 mt-12 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        More brief info about my core skills or passion...
      </motion.p>
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

