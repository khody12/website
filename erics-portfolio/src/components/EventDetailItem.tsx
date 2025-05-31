// components/EventDetailItem.tsx (New component)
import { motion, MotionValue, useTransform } from 'framer-motion';
import { TimelineEvent } from './types/timeline';
interface EventDetailItemProps {
  event: TimelineEvent;
  scrollProgress: MotionValue<number>;
}

export default function EventDetailItem({ event, scrollProgress}: EventDetailItemProps) {
  const { title, details, year, month, scrollTriggerPoint, side } = event;

  // Define the scroll range for this item to be visible/animate
  // e.g., starts appearing slightly before its trigger point, fully visible at trigger, starts fading after.
  const animationStart = scrollTriggerPoint - 0.1; // Start appearing
  const animationFull = scrollTriggerPoint;        // Fully visible/popped out
  const animationEnd = scrollTriggerPoint + 0.15;   // Start disappearing
  const animationGone = scrollTriggerPoint + 0.20;  // Fully gone

  const opacity = useTransform(
    scrollProgress,
    [animationStart, animationFull, animationEnd, animationGone],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollProgress,
    [animationStart, animationFull],
    [0.8, 1] // Pop in effect
  );

  const xOffset = side === 'left' ? -50 : 50; // Distance to pop out from
  const x = useTransform(
    scrollProgress,
    [animationStart, animationFull],
    [xOffset, 0] // Moves from offset to 0 (aligned with where it should be)
  );

  // Calculate top position based on its trigger point
  // This positions the item vertically along the scroll length.
  const topPosition = `${scrollTriggerPoint * 100}%`; 

  return (
    <motion.div
      className={`absolute w-5/12 md:w-1/3 p-6 bg-neutral-800 rounded-lg shadow-xl my-10
                  ${side === 'left' ? 'right-[calc(50%+40px)]' : 'left-[calc(50%+40px)]'} 
                  transform -translate-y-1/2`} // -translate-y-1/2 helps vertically center it against its 'top'
      style={{
        top: topPosition,
        opacity,
        scale,
        x, // Apply the pop-out motion
      }}
    >
      <p className="text-sm text-sky-400 mb-1">{month} {year}</p>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm">{details}</p>
    </motion.div>
  );
}