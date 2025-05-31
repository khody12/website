"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TimelineVisual from '@/components/TimelineVisual';
import EventDetailItem from '@/components/EventDetailItem';
import { TimelineEvent } from '@/components/types/timeline';


const eventsData: TimelineEvent[] = [
  { id: 1, month: "February", year: "2022", title: "AAA Ice Hockey", details: "For years, I had devoted most of my time to playing ice hockey competitively. But in 2022 I decided that my true interest was in building the technology that I admired and relied on everyday.", scrollTriggerPoint: 0.0, side: 'left' },
  { id: 2, month: "May", year: "2023", title: "Graduated Las Lomas High School", details: "I graduated from High School with a 4.3 Weighted GPA and 11 completed AP classes.", scrollTriggerPoint: 0.1, side: 'left' },
  { id: 3, month: "May", year: "2023", title: "Began Studying at DVC", details: "Before I had even graduated, I enrolled for my first few classes at DVC. I majored in Electrical Engineering and Computer Engineering and started off with a rigorous workload that pushed me to change the way I approached school and studying.", scrollTriggerPoint: 0.1, side: 'right' },
  { id: 4, month: "Summer", year: "2023", title: "Software QA Intern @ Dicom Systems", details: "I began a summer Software QA internship with Dicom Systems where I learned the ins and outs of the CI/CD pipeline and the process of creating regression test suites automatic test cases.", scrollTriggerPoint: 0.2, side: 'left' },
  { id: 5, month: "Fall", year: "2023", title: "Tutoring at DVC and Brightfox Education", details: "Using my knowledge in CS, Math, Econ, and Physics, I began tutoring in between classes at DVC and on the weekends at Brightfox.", scrollTriggerPoint: 0.25, side: 'right' },
  { id: 6, month: "Fall", year: "2023", title: "Applying to UC", details: "With the help of a significant number of AP credits and a rigorous summer semester at DVC, I was able to apply to transfer to UC a year early.", scrollTriggerPoint: 0.3, side: 'left' },
  { id: 7, month: "April", year: "2024", title: "Accepted to UC Berkeley", details: "Successfully transferred to UC Berkeley majoring in Electrical Engineering and Computer Sciences", scrollTriggerPoint: 0.35, side: 'right' },
  { id: 8, month: "Summer", year: "2024", title: "Taking my first classes at Cal", details: "Finishing up humanities graduation requirements.", scrollTriggerPoint: 0.38, side: 'left',  },
  { id: 9, month: "Fall", year: "2024", title: "Returned to ice hockey through club sports at Cal", details: "We went undefeated in the regular season and made the Bay Area news!", scrollTriggerPoint: 0.39, side: 'right', image: "images/cal_ice.JPG"},
  { id: 10, month: "February", year: "2025", title: "Rapid Reviews Apprenticeship at Berkeley", details: "Worked on a novelty feature for preprints utilizing a RAG approach with the chatGPT API and important indicators like H-index and citation velocity.", scrollTriggerPoint: 0.45, side: 'left'},
  { id: 11, month: "February", year: "2025", title: "Gene Network Research at UCSF", details: "Studied Computer Science at...", scrollTriggerPoint: 0.47, side: 'right', image: "" },
  { id: 12, month: "M", year: "First Job", title: "Software Engineer at XYZ", details: "Began my professional career...", scrollTriggerPoint: 0.7, side: 'left' },
  { id: 13, month: "A", year: "Key Project", title: "Led Project Alpha", details: "Successfully launched a major feature...", scrollTriggerPoint: 0.8, side: 'right' },
  // Add more events
] as const; // as const makes it infer 'left' as the side left, rather than as a string. 

export default function AboutPage() {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start start", "end end"] // Animate from when top of container hits top of viewport, to when bottom hits bottom
  });

  return (
    <div ref={timelineContainerRef} className="relative w-full bg-neutral-900 text-white py-20" style={{ minHeight: `${eventsData.length * 100}vh` }}> {/* Ensure enough scroll height */}
      {/* Central Timeline Visuals */}
      <TimelineVisual scrollProgress={scrollYProgress} events={eventsData} />

      {/* Event Details */}
      {eventsData.map((singleEventData) => (
        <EventDetailItem
          key={singleEventData.id}
          event={singleEventData}
          scrollProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}