"use client"; // makes it a client component. which is what we need when we have things like
// user interaction via buttons forms dropdowns, when we use state management
// browser apis like localStorage
import React, { useState, useRef, useEffect } from 'react';
import IntroScreen from '@/components/sections/IntroScreen';
import HorizontalNav from '@/components/layout/HorizontalNav';
import {motion, AnimatePresence, useMotionValue } from 'framer-motion';
import SkillNode from '@/components/ui/SkillNode';

interface NodeDataItem {
  id: number;
  text: string;
  description: string;
  details: string; // Added details
}

function LandingPageContent() {
  const nodeData: NodeDataItem[] = [
    { id: 1, text: "ML Research", description: "AI implementation and finetuning", details:"I worked at UCSF's Huang Lab to explore the utility of transformer-based gene networks for gene perturbation." },
    { id: 2, text: "Python/Pytorch", description: "Building Django web apps", details:"I created several full stack web apps using Django and I used PyTorch to create fully connected neural networks to enhance my applications with ML/AI. Check out these projects on Github here."},
    { id: 3, text: "Low Level Programming", description: "C/C++, RISC-V/x86 Assembly", details:"I have taken CS61C and CS161 at Cal that have given me the ability to work on low level code."},
    { id: 4, text: "React/Next.js", description: "I have utilized React and Next to build my web apps", details:"NAN" },
    { id: 5, text: "RAG", description: "Building AI systems with helpful insights", details: "I worked at Rapid Reviews through the UC Berkeley URAP program and worked on a novelty feature for assessing preprints powered by RAG." },
    { id: 6, text: "UI/UX Passion", description: "User-centric Design", details: "NAN" },
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [containerDims, setContainerDims] = useState({width: 0, height:0});
  const constellationRef = useRef<HTMLDivElement>(null);

  const[selectedNode, setSelectedNode] = useState<NodeDataItem | null>(null); 
  //use something that can be a node data item or null

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
  // parameter type is specified, name of var is Node and must be type NodeDataItem. we use : for this.
  const handleNodeClick = (node: NodeDataItem) => {
    setSelectedNode(node);
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
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
        I'm an EECS student at UC Berkeley with experience in Machine Learning and AI and an interest in building software and hardware.
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
              dragConstraintsRef={constellationRef}
              onClick={() => handleNodeClick(node)} // when we click a node, it will execute handleNodeClick
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
      
      <AnimatePresence>
        {selectedNode && ( // if selectedNode==True, then we 
          <motion.div
            key="skill-detail-modal"
            // Overlay styles
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal} // Close by clicking overlay
          >
            {/* Modal Content Pane */}
            <motion.div
              className="bg-neutral-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg relative border border-neutral-700"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.3 } }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-neutral-400 hover:text-white text-2xl"
                aria-label="Close skill details"
              >
                &times; {/* A simple 'X' icon */}
              </button>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-400 mb-3">{selectedNode.text}</h2>
              <p className="text-md md:text-lg text-neutral-300 mb-4">{selectedNode.description}</p>
              <div className="border-t border-neutral-700 pt-4">
                <p className="text-sm md:text-base text-neutral-400 whitespace-pre-line">
                  {selectedNode.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  
  return ( 
    // we wrap our two screen in Framers <animatePresence> this allows us to show us the Intro screen first, once showIntro is False which the handleIntroComplete
    // function will handle, we seamlessly transition into the landing page. We must have keys for the two.
    <AnimatePresence>
      {showIntro ? (
        <motion.div
        key="intro"
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        <IntroScreen onComplete={handleIntroComplete} />
      </motion.div>

      ) : (
        <motion.div
        key="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.0, delay: 0.2 } }}
        className="flex flex-col flex-grow" // This page's content area 
      >
        <LandingPageContent />
      </motion.div>

      )}
      
    </AnimatePresence>
    );
  
}

