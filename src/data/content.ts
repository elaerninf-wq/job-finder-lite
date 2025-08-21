export interface Job {
  id: string;
  company: string;
  logo: string;
  role: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  experience: '0-1' | '1-3' | '3-5' | '5+';
  ctc?: string;
  stipend?: string;
  postedAt: string;
  applyUrl: string;
  tags: string[];
  deadline?: string;
  featured?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Course' | 'Roadmap' | 'Cheat-sheet' | 'Playlist' | 'Tools';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels';
  url: string;
  description: string;
  provider?: string;
  featured?: boolean;
}

export interface Offer {
  id: string;
  provider: string;
  logo: string;
  course: string;
  originalPrice?: string;
  discountedPrice?: string;
  isFree?: boolean;
  expiresAt: string;
  url: string;
  featured?: boolean;
}

export const JOBS: Job[] = [
  {
    id: "job-001",
    company: "GitHub",
    logo: "🐙",
    role: "Frontend Engineer (New Grad)",
    location: "Remote",
    type: "Full-time",
    experience: "0-1",
    ctc: "₹12–18 LPA",
    postedAt: "2025-08-18",
    applyUrl: "#",
    tags: ["JavaScript", "React", "TypeScript"],
    deadline: "2025-09-05",
    featured: true
  },
  {
    id: "job-002",
    company: "Google",
    logo: "🔍",
    role: "Software Engineer Intern",
    location: "Bengaluru",
    type: "Internship",
    experience: "0-1",
    stipend: "₹80,000/month",
    postedAt: "2025-08-19",
    applyUrl: "#",
    tags: ["C++", "Algorithms", "Data Structures"],
    deadline: "2025-09-10"
  },
  {
    id: "job-003",
    company: "Microsoft",
    logo: "💻",
    role: "Full Stack Developer",
    location: "Hyderabad",
    type: "Full-time",
    experience: "1-3",
    ctc: "₹15–22 LPA",
    postedAt: "2025-08-20",
    applyUrl: "#",
    tags: ["Node.js", "Azure", "React"],
    deadline: "2025-09-15"
  },
  {
    id: "job-004",
    company: "Amazon",
    logo: "📦",
    role: "SDE Intern",
    location: "Remote",
    type: "Internship",
    experience: "0-1",
    stipend: "₹75,000/month",
    postedAt: "2025-08-17",
    applyUrl: "#",
    tags: ["Java", "AWS", "System Design"],
    deadline: "2025-08-30"
  }
];

export const INTERNSHIPS: Job[] = JOBS.filter(job => job.type === 'Internship');

export const RESOURCES: Resource[] = [
  {
    id: "res-001",
    title: "MIT OpenCourseWare – 6.006 Introduction to Algorithms",
    type: "Course",
    level: "Intermediate",
    url: "#",
    description: "Comprehensive algorithms course with problem sets, exams, and video lectures covering fundamental CS algorithms.",
    provider: "MIT",
    featured: true
  },
  {
    id: "res-002",
    title: "LeetCode Patterns & Interview Prep",
    type: "Roadmap",
    level: "All levels",
    url: "#",
    description: "Curated collection of coding patterns for technical interviews with 150+ practice problems organized by difficulty."
  },
  {
    id: "res-003",
    title: "System Design Interview Cheat Sheet",
    type: "Cheat-sheet",
    level: "Intermediate",
    url: "#",
    description: "Complete guide to system design concepts including scalability, databases, caching, and real-world examples."
  },
  {
    id: "res-004",
    title: "Full Stack Web Development Bootcamp",
    type: "Playlist",
    level: "Beginner",
    url: "#",
    description: "100+ hours of content covering HTML, CSS, JavaScript, React, Node.js, databases, and deployment.",
    provider: "FreeCodeCamp"
  },
  {
    id: "res-005",
    title: "Developer Tools & Extensions Pack",
    type: "Tools",
    level: "All levels",
    url: "#",
    description: "Essential VS Code extensions, browser dev tools, and productivity apps for modern web development."
  }
];

export const OFFERS: Offer[] = [
  {
    id: "off-001",
    provider: "Coursera",
    logo: "🎓",
    course: "Google Career Certificates Bundle",
    originalPrice: "₹3,999/month",
    discountedPrice: "₹999/month",
    expiresAt: "2025-08-31T23:59:59Z",
    url: "#",
    featured: true
  },
  {
    id: "off-002",
    provider: "Udemy",
    logo: "📚",
    course: "Complete Web Developer Bootcamp",
    originalPrice: "₹6,999",
    isFree: true,
    expiresAt: "2025-08-28T23:59:59Z",
    url: "#"
  },
  {
    id: "off-003",
    provider: "Pluralsight",
    logo: "🔧",
    course: "Premium Plan (3 Months Free)",
    originalPrice: "₹1,999/month",
    isFree: true,
    expiresAt: "2025-09-15T23:59:59Z",
    url: "#"
  }
];

export type TabType = 'jobs' | 'internships' | 'resources' | 'offers' | 'saved';

export const TABS: { id: TabType; label: string; count?: number }[] = [
  { id: 'jobs', label: 'Jobs', count: JOBS.filter(j => j.type === 'Full-time').length },
  { id: 'internships', label: 'Internships', count: INTERNSHIPS.length },
  { id: 'resources', label: 'Resources', count: RESOURCES.length },
  { id: 'offers', label: 'Offers', count: OFFERS.length },
  { id: 'saved', label: 'Saved' }
];