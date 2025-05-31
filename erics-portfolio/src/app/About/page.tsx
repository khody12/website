"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TimelineVisual from '@/components/TimelineVisual';
import EventDetailItem from '@/components/EventDetailItem';
import { TimelineEvent } from '@/components/types/timeline';


const eventsData: TimelineEvent[] = [
  { id: 1, month: "February", year: "2022", title: "AAA Ice Hockey", details: "For years, I had devoted most of my time to playing ice hockey competitively. But in 2022 I decided that my true interest was in building the technology that I admired and relied on everyday.", scrollTriggerPoint: 0.0, side: 'left' },
  { id: 2, month: "May", year: "2023", title: "Graduated Las Lomas High School", details: "I graduated from High School with a 4.3 Weighted GPA", scrollTriggerPoint: 0.1, side: 'left' },
  { id: 3, month: "May", year: "2023", title: "Began Studying at DVC", details: "I majored in Electrical Engineering and Computer Engineering and started with a rigorous schedule.", scrollTriggerPoint: 0.1, side: 'right' },
  { id: 4, month: "August", year: "2023", title: "Software Engineer at XYZ", details: "Began my professional career...", scrollTriggerPoint: 0.2, side: 'left' },
  { id: 5, month: "A", year: "Key Project", title: "Led Project Alpha", details: "Successfully launched a major feature...", scrollTriggerPoint: 0.4, side: 'right' },
  { id: 6, month: "Jan", year: "Birth", title: "Born and Raised", details: "Started my journey in...", scrollTriggerPoint: 0.5, side: 'left' },
  { id: 7, month: "F", year: "Education", title: "Graduated University", details: "Studied Computer Science at...", scrollTriggerPoint: 0.6, side: 'right' },
  { id: 8, month: "M", year: "First Job", title: "Software Engineer at XYZ", details: "Began my professional career...", scrollTriggerPoint: 0.7, side: 'left' },
  { id: 9, month: "A", year: "Key Project", title: "Led Project Alpha", details: "Successfully launched a major feature...", scrollTriggerPoint: 0.8, side: 'right' },
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