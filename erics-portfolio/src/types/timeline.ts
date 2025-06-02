export interface TimelineEvent {
    id: number;
    year: string;
    month?: string; 
    title: string;
    details: string;
    scrollTriggerPoint: number; 
    side: 'left' | 'right';
    image?: string; 
    link?: string;
  }