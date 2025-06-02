"use client";
import React from 'react';
import Link from 'next/link';


import { motion } from 'framer-motion';
import ProjectSection from '@/components/sections/ProjectSection'; // Adjust path
import { type Project } from '@/types/projects'; // Adjust path


const projectsData: Project[] = [
  {
    id: 'workout-app',
    title: 'Workout Tracker with ML Powered Recommendations',
    imageUrl: '/images/projects/workout-app-hero.jpg', 
    description: 'A Django/DRF powered web application that allows users to track and store their workouts with special benefits for those with Oura Rings. On days where they need some help thinking of a workout, Ascend can recommend ideal workouts for you based on your activity and sleep score along with the muscle group you are targeting.',
    technologies: ['React', 'Python', 'Django/DRF', 'PyTorch', 'PostgreSQL', 'Machine Learning', 'CRUD'],
    links: [
      // todo
    ],
    isPrivate: false,
  },
  {
    id: 'election-predictor',
    title: 'Election Outcome Predictor',
    imageUrl: '/images/projects/election-predictor-visual.jpg',
    description: 'A data-driven project utilizing historical voting data and a fully connected neural network to attempt to predict the outcome of the 2024 election. It largely used country level data and polling data was aggregated from reputable pollsters.',
    technologies: ['Python', 'HTML/CSS', 'Javascript', 'PyTorch', 'Data Wrangling'],
    links: [
      // todo
    ],
    isPrivate: false,
  },
  {
    id: 'django-app',
    title: 'Full-Stack Django Platform',
    imageUrl: '/images/projects/django-generic.jpg',
    description: 'Developed a blog / web application using the Django framework, featuring user authentication, database interactions, and a RESTful API for modularity.',
    technologies: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'SQLite'],
    isPrivate: false,
  },
  {
    id: 'berkeley-class-project',
    title: 'Random Map Generator',
    imageUrl: undefined, 
    description: 'I collaborated with one other student on a Java project for CS61B. We were tasked with creating a 2D game where we could control a playable character and create randomly generated maps with fluctuating hallway and room sizes. We additionally added sound effects and light effects.',
    technologies: ['Java', 'Data Structures', 'Git', 'Design'],
    isPrivate: true,
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-neutral-900 text-white min-h-screen"> 
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center pt-16 md:pt-24 mb-16 md:mb-20 tracking-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Selected <span className="text-sky-400">Works</span>
        </motion.h1>
      </div>
      <div> {/* All projects within this div, each <ProjectSection> is a component also with divs within, of course.  */}
        {projectsData.map((project, index) => (
          <ProjectSection
            key={project.id} // we need to make sure all projects have an id e.g. 1, 2, 3. 
            //so that when we render the components, they have keys that can be assigned to them. 
            //the key just needs to be unique for the projectsData list, doesn't have to be unique globally.
            // react uses this key to understand which projectSection component corresponds to which piece of project data.
            // if we didn't have it, react could get confused and update the wrong component if the order of the projects in our projectData list is rearranged for whatever reason.
            project={project}
            reverseOrder={index % 2 !== 0} // Alternate layout for every other project
            index={index}
          />
        ))}
      </div>
      <div className="py-16 md:py-24 text-center"> {/* Footer spacing or Call to Action */}
        <p className="text-neutral-400">Interested in learning more or discussing a collaboration?</p>
        <Link href="/contact" className="mt-4 inline-block bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow hover:shadow-md" >
          Get in Touch
        </Link>
      </div>
    </main>
  );
}