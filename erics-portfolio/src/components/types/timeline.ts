export interface TimelineEvent {
    id: number;
    year: string;
    month?: string; // Optional if not all events have it
    title: string;
    details: string;
    scrollTriggerPoint: number; // e.g., 0.1 for 10% scroll
    side: 'left' | 'right';
    image?: string; // Optional
  }