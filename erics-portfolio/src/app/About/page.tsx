"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TimelineVisual from '@/components/TimelineVisual';
import EventDetailItem from '@/components/sections/EventDetailItem';
import { TimelineEvent } from '@/types/timeline';


const eventsData: TimelineEvent[] = [
  { id: 1, month: "February", year: "2022", title: "AAA Ice Hockey", details: "For years, I had devoted most of my time to playing ice hockey competitively. But in 2022 I decided that my true interest was in building the technology that I admired and relied on everyday.", scrollTriggerPoint: 0.0, side: 'left' },
  { id: 2, month: "May", year: "2023", title: "Graduated Las Lomas High School", details: "I graduated from High School with a 4.3 Weighted GPA and 11 completed AP classes.", scrollTriggerPoint: 0.1, side: 'left', image: "images/graduation.png"},
  { id: 3, month: "May", year: "2023", title: "Began Studying at DVC", details: "Before I had even graduated, I enrolled for my first few classes at DVC. I majored in Electrical Engineering and Computer Engineering and started off with a rigorous workload that pushed me to change the way I approached school and studying.", scrollTriggerPoint: 0.1, side: 'right' },
  { id: 4, month: "Summer", year: "2023", title: "Software QA Intern @ Dicom Systems", details: "I began a summer Software QA internship with Dicom Systems where I learned the ins and outs of the CI/CD pipeline and the process of creating regression test suites automatic test cases.", scrollTriggerPoint: 0.2, side: 'left' },
  { id: 5, month: "Fall", year: "2023", title: "Tutoring at DVC and Brightfox Education", details: "Using my knowledge in CS, Math, Econ, and Physics, I began tutoring in between classes at DVC and on the weekends at Brightfox.", scrollTriggerPoint: 0.30, side: 'right' },
  { id: 6, month: "Fall", year: "2023", title: "Applying to UC", details: "With the help of a significant number of AP credits and a rigorous summer semester at DVC, I was able to apply to transfer to UC a year early.", scrollTriggerPoint: 0.35, side: 'left' },
  { id: 7, month: "April", year: "2024", title: "Accepted to UC Berkeley", details: "Successfully transferred to UC Berkeley majoring in Electrical Engineering and Computer Sciences", scrollTriggerPoint: 0.4, side: 'right' },
  { id: 8, month: "Summer", year: "2024", title: "After leaving DVC with a 4.0 GPA, I began taking my first classes at Cal", details: "I finished up my graduation requirements in the humanities.", scrollTriggerPoint: 0.45, side: 'left',  },
  { id: 9, month: "Fall", year: "2024", title: "Returned to ice hockey recreationally through club sports at Cal", details: "We went undefeated in the regular season and made the Bay Area news!", scrollTriggerPoint: 0.47, side: 'right', image: "images/cal_ice.JPG", link: ""},
  { id: 10, month: "Fall", year: "2024", title: "Launched my substack.", details: "Incredibly infrequently, I like to post on substack where I largely discuss American domestic politics and economics.", scrollTriggerPoint: 0.53, side: 'left', image: "", link: "https://substack.com/@erickhodorenko?utm_source=user-menu"},
  { id: 11, month: "January", year: "2025", title: "Rapid Reviews Apprenticeship at Berkeley", details: "Worked on a novelty feature for preprints utilizing a RAG approach with the chatGPT API and important indicators like H-index and citation velocity.", scrollTriggerPoint: 0.59, side: 'left', image:"https://resize-v3.pubpub.org/eyJidWNrZXQiOiJhc3NldHMucHVicHViLm9yZyIsImtleSI6Ijc3cDh2ODVxLzcxNjY4NzE5Mjk2NTY0LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfX19", link: "https://rrid.mitpress.mit.edu"},
  { id: 12, month: "January", year: "2025", title: "Gene Network Research at UCSF", details: "Began working at Dr. Guo Huang's lab on a gene network project that seeked to assess the viability of foundational gene network machine learning models like Geneformer and scGPT for in silico gene perturbation. Essentially, the process of manipulating certain bits of a single-cell RNA sequence to identify possible links between cell types that are difficult to identify through wet lab.", scrollTriggerPoint: 0.63, side: 'right', image: "logos/UCSF_logo.svg", link: "https://scvrb-core.ucsf.edu/~huang/lab/Research.html"},
  { id: 13, month: "June", year: "2025", title: "ML Engineer Intern at FlourishAI", details: "Landed my first machine learning internship at a Skydeck funded startup that is working on a new take on managing chronic diseases using multimodal AI and providing AI insights to help people live a healthier, happier life.", scrollTriggerPoint: 0.67, side: 'left', image: "logos/flourishAI_logo.png", link: "https://www.tryflourish.ai" },
  { id: 14, month: "June", year: "2025", title: "ML Engineer Intern at Daxe", details: "Landed a part time machine learning internship at another Skydeck funded startup that is working on an AI-driven search platform to empower oragnizations to better utilize and access their structured and unstructured data to drive informed decision-making and supply important insights.", scrollTriggerPoint: 0.70, side: 'right', image: "https://media.licdn.com/dms/image/v2/D560BAQGDdsKRWo7G1A/company-logo_200_200/company-logo_200_200/0/1710351602102/invest_capital_ai_logo?e=1753920000&v=beta&t=gR-kZVr6UjTSIDJc6qzUIIPg82q7JOmEpPTmVo54xFc", link: "https://www.daxe.ai" },
  { id: 15, month: "", year: "Soon", title: "Get in touch", details: "I'm always looking to work on exciting new projects. Have something in mind? Feel free to reach out to me here.", scrollTriggerPoint: 0.95, side: 'left',}
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