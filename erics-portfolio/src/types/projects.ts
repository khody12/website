export interface ProjectLink {
    label:string;
    url:string;
    type?: 'github' | 'live' | 'video'; // I might apply some different style depending on what kinda content we got here.
  }
  
export interface Project {
    id:string;
    title:string;
    imageUrl?:string
    description:string;
    longDescription?: string;
    technologies:string[];
    links?: ProjectLink[];
    isPrivate: boolean;
  }
  