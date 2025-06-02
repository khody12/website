// src/components/TimelineVisual.tsx

import { type MotionValue, motion, useTransform } from 'framer-motion';
// Assuming your TimelineEvent type is in a shared file, or you define a local one:
import { type TimelineEvent } from '../types/timeline'; // Adjust path if your type is elsewhere

// This type describes the fields from TimelineEvent that EventMarker actually uses
interface MarkerSpecificEventData {
  id: number; // Or string
  scrollTriggerPoint: number;
}

interface EventMarkerProps {
  event: MarkerSpecificEventData;
  scrollProgress: MotionValue<number>;
}

function EventMarker({ event, scrollProgress }: EventMarkerProps) {
  const markerFill = useTransform(
    scrollProgress,
    [event.scrollTriggerPoint - 0.02, event.scrollTriggerPoint, event.scrollTriggerPoint + 0.02],
    ["#404040", "#10B981", "#10B981"] // Grey -> Green -> Stays Green
  );

  return (
    <motion.circle
      cx="1" // Line is at x="1"
      cy={`${event.scrollTriggerPoint * 100}%`}
      r="6"
      style={{ fill: markerFill }}
    />
  );
}

// Define the props for TimelineVisual itself
interface TimelineVisualProps {
  scrollProgress: MotionValue<number>;
  // It expects an array of objects that match (or are compatible with) TimelineEvent
  // Using 'readonly TimelineEvent[]' is good if 'events' in AboutPage is 'as const'
  events: readonly TimelineEvent[];
}

export default function TimelineVisual({ scrollProgress, events }: TimelineVisualProps) {
  // 'events' is now available here as a prop
  const greenLinePathLength = scrollProgress;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-full w-1 z-0 pointer-events-none">
      <svg width="2" height="100%" className="h-full overflow-visible">
        <line x1="1" y1="0" x2="1" y2="100%" stroke="#404040" strokeWidth="2" />
        <motion.line
          x1="1" y1="0" x2="1" y2="100%"
          stroke="#10B981" strokeWidth="2"
          style={{ pathLength: greenLinePathLength }}
        />

        {/* Now you map over the 'events' prop */}
        {events.map((eventItem) => (
          <EventMarker
            key={eventItem.id} // Use the unique ID from the event data
            event={eventItem}   // Pass the necessary parts of eventItem
            scrollProgress={scrollProgress}
          />
        ))}
      </svg>
    </div>
  );
}
