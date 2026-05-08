import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { Flask } from "@/components/ui/svgs/flask";
import { RedHat } from "@/components/ui/svgs/redhat";
import { Ansible } from "@/components/ui/svgs/ansible";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Spring } from "@/components/ui/svgs/spring";

export const DATA = {
  name: "Terry Nguyen",
  initials: "TN",
  url: "https://terrykn.github.io",
  location: "Edison, NJ",
  locationLink: "https://www.google.com/maps/place/Edison,+NJ",
  description: "Full Stack Software Engineer at Verizon",
  summary:
    "I'm a [full stack software engineer at Verizon](/#work) based in Edison, New Jersey. I graduated Rutgers University in May 2025 with a [double major in computer science and math](/#education). I enjoy bringing ideas to life through new projects, whether by developing solutions in my work, building [side projects](/#projects), or teaming up at [hackathons](/#hackathons).",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Typescript", icon: Typescript },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Spring", icon: Spring },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Flask", icon: Flask },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Red Hat OpenShift", icon: RedHat },
    { name: "Ansible", icon: Ansible },
    { name: "Java", icon: Java },
    { name: "C#", icon: Csharp },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "terryknguyen@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/terrykn",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/terrykn",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:terryknguyen@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Verizon",
      href: "https://verizon.com",
      badges: [],
      location: "Basking Ridge, NJ",
      title: "Full Stack Engineer",
      logoUrl: "/verizon.png",
      start: "Jun 2025",
      end: "Present",
      description:
        "Develop applications to support system administrators in provisioning Red Hat OpenShift infrastructure and managing system resources. Automate server builds, upgrades, and management tasks with GitLab CI/CD pipeline, ensuring consistent and reliable system performance.",
    },
    {
      company: "Verizon",
      href: "https://verizon.com",
      badges: [],
      location: "Basking Ridge, NJ",
      title: "Full Stack Intern",
      logoUrl: "/verizon.png",
      start: "Jun 2024",
      end: "Aug 2024",
      description:
        "Developed a Python/Flask app to automate virtual machine builds via Ansible Tower’s API. Configured Grafana dashboards with Red Hat Satellite servers to monitor metrics and alerts. Maintained server infrastructure by performing OS patches and upgrades.",
    },
    {
      company: "Data Annotation",
      href: "https://dataannotation.tech",
      badges: [],
      location: "Remote",
      title: "AI Trainer",
      logoUrl: "/da.png",
      start: "Aug 2023",
      end: "Present",
      description:
        "Create complex prompts, rate model responses, and develop rubrics and unit tests for coding LLMs focused on Python, JavaScript, and React/HTML.",
    },
    {
      company: "Rutgers University",
      href: "https://rutgers.edu",
      badges: [],
      location: "New Brunswick, NJ",
      title: "Library Assistant",
      logoUrl: "/rutgers.png",
      start: "Sep 2022",
      end: "May 2025",
      description:
        "Assisted patrons at the front desk with inquiries, reservations, tech support, and events in the Hatchery Studio. Handled phone inquiries and circulation services, including book requests, check-outs, and returns.",
    },
    {
      company: "Rutgers CliMit",
      href: "#",
      badges: [],
      location: "New Brunswick, NJ",
      title: "Technology Lead",
      logoUrl: "/climit.jpg",
      start: "Sep 2023",
      end: "Dec 2023",
      description:
        "Worked with a small student team on prototyping and presenting an application to crowdsource critical information during floods in New Brunswick.",
    },
    {
      company: "Rutgers I.D.E.A.",
      href: "#",
      badges: [],
      location: "New Brunswick, NJ",
      title: "Research Intern",
      logoUrl: "/rutgers.png",
      start: "May 2023",
      end: "Jun 2023",
      description:
        "Developed solutions to recover tidal flow and mitigate an invasive marsh-grass species in Grassle Marsh, NJ at the Jacques Cousteau National Estuarine Research Reserve.",
    },
    {
      company: "Rutgers Blueprint",
      href: "#",
      badges: [],
      location: "New Brunswick, NJ",
      title: "Software Engineering Fellow",
      logoUrl: "/blueprint.jpg",
      start: "Feb 2023",
      end: "Apr 2023",
      description:
        "Designed, developed, and presented interactive web apps to help students learn and practice React development.",
    },
    {
      company: "Teachers College, Columbia University",
      href: "https://tc.columbia.edu",
      badges: [],
      location: "Remote",
      title: "Research Intern",
      logoUrl: "/tc.jpg",
      start: "May 2021",
      end: "May 2021",
      description:
        "Evaluated interview data for Dr. Xiaodong Lin’s psychological research study on motivation and failure in athletes and students at the Education for Persistence & Innovation Center (EPIC).",
    },
  ],
  education: [
    {
      school: "Georgia Institute of Technology",
      href: "https://www.gatech.edu/",
      degree: "Master's in Computer Science - Machine Learning",
      logoUrl: "/gatech.jpeg",
      start: "2026",
      end: "Present",
      description: ""
    },
    {
      school: "Rutgers University",
      href: "https://rutgers.edu",
      degree: "Bachelor's in Computer Science, Mathematics",
      logoUrl: "/rutgers.png",
      start: "2022",
      end: "2025",
      description: "GPA: 3.63, Honors College, Dean's List. Relevant courses: Data Structures, Algorithms, Software Methodology, Information & Data Management, Intro to AI, Discrete Math, Linear Algebra, Real Analysis."
    },
  ],
  projects: [
    {
      title: "CoPlay",
      href: "",
      dates: "May 2026",
      active: true,
      description: "Mobile app for watching videos together.",
      technologies: ["React Native", "TypeScript"],
      links: [

      ],
      image: "",
      video: "",
    },
    {
      title: "Agenda",
      href: "https://get-agenda.vercel.app/",
      dates: "Apr 2026",
      active: true,
      description: "Mobile app for tracking projects, habits, and calendar events.",
      technologies: ["React", "TypeScript", "Ionic Framework", "Capacitor"],
      links: [
        {
          type: "Landing Page",
          href: "https://get-agenda.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Portfolio",
      href: "",
      dates: "Mar 2026",
      active: true,
      description: "Personal portfolio featuring my projects and experience. (you're already here!)",
      technologies: ["React", "TypeScript", "Next.js", "shadcn/ui"],
      links: [
        {
          type: "Website",
          href: "https://terrykn.github.io",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Growtopia Item Market",
      href: "https://growtopia-trade.vercel.app",
      dates: "Nov 2025",
      active: true,
      description: "Developed an unofficial item marketplace web application for the Growtopia MMO game.",
      technologies: ["React", "JavaScript", "Firebase", "Mantine UI"],
      links: [
        {
          type: "Website",
          href: "https://growtopia-trade.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Lofi Pomodoro",
      href: "https://chromewebstore.google.com/detail/iedneihfhfkbimfjimpkfjdaonajfefe",
      dates: "Jul 2025",
      active: true,
      description: "Chrome extension combining a customizable Pomodoro timer with live lo-fi music streams, featured on the Chrome Web Store.",
      technologies: ["JavaScript", "HTML/CSS"],
      links: [
        {
          type: "Chrome Web Store",
          href: "https://chromewebstore.google.com/detail/iedneihfhfkbimfjimpkfjdaonajfefe",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Postify",
      href: "https://postify-music.vercel.app",
      dates: "Jul 2025",
      active: true,
      description: "Created a web app for generating album and lyric posters from Spotify album and song URLs.",
      technologies: ["React", "JavaScript", "RapidAPI"],
      links: [
        {
          type: "Website",
          href: "https://postify-music.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/terrykn/postify",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Face and Digit Classification",
      href: "https://github.com/terrykn/face-and-digit-classification",
      dates: "May 2025",
      active: true,
      description: "Benchmarked a custom implementation of MLP and Perceptron against a PyTorch baseline for classifying faces and digits, achieving 92% accuracy.",
      technologies: ["Python", "NumPy", "PyTorch", "Matplotlib", "Neural Networks"],
      links: [
        {
          type: "Source",
          href: "https://github.com/terrykn/face-and-digit-classification",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "GroceryWiz",
      href: "https://terrykn.github.io/grocerywiz/",
      dates: "Mar 2025",
      active: true,
      description: "Application for discovering recipes, watching cooking videos, and generating grocery lists.",
      technologies: ["React", "JavaScript", "Firebase", "RapidAPI", "MaterialUI"],
      links: [
        {
          type: "Website",
          href: "https://terrykn.github.io/grocerywiz/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/terrykn/grocerywiz",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Gemini Sentiment Analysis",
      href: "https://devpost.com/software/oracle-8pg52k",
      dates: "May 2024",
      active: true,
      description: "Real-time text analysis tool leveraging Google AI Gemini to assess public sentiment on X (Twitter).",
      technologies: ["React", "JavaScript", "RapidAPI", "Gemini 1.0 Pro API"],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/oracle-8pg52k",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "RecipeSnap",
      href: "https://devpost.com/software/recipesnap",
      dates: "Mar 2024",
      active: true,
      description: "Mobile app using AI to recognize food images and generate ingredients and real-time prices.",
      technologies: ["React Native", "Python", "FastAPI", "Axios", "Expo Go"],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/recipesnap",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "HeartUp",
      href: "https://github.com/HannahNJIT/HeartUp",
      dates: "Feb 2024",
      active: true,
      description: "Cardiac digital twin widget for risk prediction based on ECG and health data.",
      technologies: ["Python", "MATLAB", "PyTorch", "TensorFlow", "Unity"],
      links: [
        {
          type: "Source",
          href: "https://github.com/HannahNJIT/HeartUp",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "NJ Transit Trip Music Planner",
      href: "https://devpost.com/software/trip-music-planner",
      dates: "Oct 2023",
      active: true,
      description: "Web app enhancing bus-riding with curated playlists for 30,000+ NJ Transit stops.",
      technologies: ["React", "Prisma", "Python", "NJ Transit API"],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/trip-music-planner",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Movie Searching Web App",
      href: "https://terrykn.github.io/streamwizard",
      dates: "Jul 2023",
      active: true,
      description: "Comprehensive movie searching tool using OMDb API to fetch content and posters.",
      technologies: ["React", "HTML", "CSS", "JavaScript", "OMDb API"],
      links: [
        {
          type: "Website",
          href: "https://terrykn.github.io/streamwizard",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Space Explorer 2D Game",
      href: "https://terrykn.github.io/space-explorer",
      dates: "Jul 2023",
      active: true,
      description: "Developed a 2D spaceship game with player movement and score tracking in Unity.",
      technologies: ["Unity", "C#"],
      links: [
        {
          type: "Website",
          href: "https://terrykn.github.io/space-explorer",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Tripadvisor Data Analysis",
      href: "https://kaggle.com/terrykn/tripadvisor",
      dates: "Jun 2023",
      active: true,
      description: "Visualizations and a Random Forest model to predict review counts for NYC restaurants.",
      technologies: ["Python", "Random Forest", "Matplotlib"],
      links: [
        {
          type: "Kaggle",
          href: "https://kaggle.com/terrykn/tripadvisor",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Spotify Popularity Predictor",
      href: "https://kaggle.com/terrykn/spotify",
      dates: "Nov 2022",
      active: true,
      description: "Linear regression model to predict song popularity based on loudness and speechiness.",
      technologies: ["Python", "Linear Regression", "Spotify WebAPI"],
      links: [
        {
          type: "Kaggle",
          href: "https://kaggle.com/terrykn/spotify",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Google AI Hackathon",
      dates: "May 2024",
      location: "Remote",
      description: "Real-time text analysis tool leveraging Google AI Gemini to assess public sentiment on X (Twitter).",
      image: "",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/oracle-8pg52k",
        },
      ],
    },
    {
      title: "HackRU Spring ‘24",
      dates: "Mar 2024",
      location: "New Brunswick, NJ",
      description: "Winner - Mobile app recognizing food images to generate ingredients and real-time grocery prices.",
      win: "HackRU Spring ‘24 Winner",
      image: "",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/recipesnap",
        },
      ],
    },
    {
      title: "Rutgers Health Hack 2024",
      dates: "Feb 2024",
      location: "New Brunswick, NJ",
      description: "Honorable Mention - Cardiac digital twin widget for risk prediction based on ECG data.",
      win: "Honorable Mention Award",
      image: "",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/HannahNJIT/HeartUp",
        },
      ],
    },
    {
      title: "HackRU Fall ‘23",
      dates: "Oct 2023",
      location: "New Brunswick, NJ",
      description: "Winner - Web app enhancing bus-riding with curated music playlists for 30,000+ NJ Transit stops.",
      win: "HackRU Fall ‘23 Winner",
      image: "",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/trip-music-planner",
        },
      ],
    },
  ],
} as const;