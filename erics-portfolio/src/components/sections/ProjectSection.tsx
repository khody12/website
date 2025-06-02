"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project, ProjectLink } from "@/types/projects"

interface ProjectSectionProps {
    project: Project;
    reverseOrder?: boolean; // To alternate layout, left v right.
    index: number; // For animation staggering
  }
  
//animation states.
const sectionVariants = {
    hidden: { opacity: 0, y: 60 },// hidden is state before the animation
    visible: {// visible is state after animation.
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -30 }, 
    visible: (delay = 0) => ({ 
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay, ease: [0.6, 0.05, 0.01, 0.9] },
    }),
  };
  
  const imageVariants = {
    hidden: { opacity: 0, x: 30 }, // Opposite direction for image if text slides from left
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay, ease: [0.6, 0.05, 0.01, 0.9] },
    }),
  };
  
  
  export default function ProjectSection({ project, reverseOrder = false, index }: ProjectSectionProps) {
    const imageDelay = 0.2;
    const textDelay = 0.4;
  
    return (
      <motion.section
        className="py-16 md:py-24 border-b border-neutral-800 last:border-b-0"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }} // Trigger when 25% of section is visible
      >
        <div
          className={`container mx-auto px-4 flex flex-col items-center gap-8 md:gap-12 lg:gap-16
                      ${reverseOrder ? 'md:flex-row-reverse' : 'md:flex-row'}`}
        >
          {/* Image Side */}
          <motion.div
            className="md:w-1/2 lg:w-3/5 w-full"
            variants={reverseOrder ? imageVariants : itemVariants} // Adjust variant based on side
            custom={imageDelay} // Pass delay to variant
          >
            {project.imageUrl && (
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl group">
                <Image
                  src={project.imageUrl}
                  alt={`Visual for ${project.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  priority={index < 2} // Prioritize loading for the first two images
                  unoptimized={project.imageUrl.endsWith('.gif')}
                />
              </div>
            )}
            {!project.imageUrl && project.isPrivate && (
              <div className="relative w-full aspect-[16/10] rounded-lg bg-neutral-700/50 flex items-center justify-center shadow-xl">
                <p className="text-neutral-400 italic">Visual representation for private project</p>
              </div>
            )}
          </motion.div>
  
          {/* Text Side */}
          <motion.div
            className="md:w-1/2 lg:w-2/5 text-center md:text-left"
            variants={reverseOrder ? itemVariants : imageVariants} // Adjust variant based on side
            custom={textDelay}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-sky-400">
              {project.title}
            </h2>
            <p className="text-neutral-300 mb-6 md:text-lg leading-relaxed">
              {project.description}
            </p>
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase text-neutral-400 mb-2 tracking-wider">
                Key Technologies:
              </h4>
              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-neutral-700 text-neutral-100 px-3 py-1.5 rounded-md text-sm shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-8">
              {project.links?.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 shadow hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
                >
                  {link.label}
                </a>
              ))}
              {project.isPrivate && (!project.links || project.links.length === 0) && (
                <span className="text-neutral-500 text-sm italic self-center py-2.5">
                  Internal/Private Project
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }