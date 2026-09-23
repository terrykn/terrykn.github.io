import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  meta: {
    title: "Terry Nguyen | Full Stack Software Engineer",
    description:
      "Personal portfolio of Terry Nguyen, Full Stack Software Engineer specializing in scalable web systems, cloud infrastructure, and AI engineering.",
  },

  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
  ],

  hero: {
    greeting: "Hi, I'm",
    name: "Terry",
    title: "Software Engineer",
    bio: "I'm a full stack software engineer at Verizon with experience designing and developing apps, APIs, and AI systems that streamline workflows and support enterprise Linux infrastructure.",
    socialLinks: [
      { label: "Projects", href: "#projects", isPrimary: true },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/terrykn",
        isPrimary: false,
      },
      {
        label: "Email",
        href: "mailto:terryknguyen@gmail.com",
        isPrimary: false,
      },
    ],
  },

  skills: [
    {
      category: "Languages",
      skills: [
        "Java",
        "Python",
        "TypeScript",
        "JavaScript",
        "SQL",
        "HTML/CSS",
        "YAML",
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "React",
        "Spring Boot",
        "Node.js",
        "Flask",
        "FastAPI",
        "JUnit",
        "LangGraph",
        "React Native",
      ],
    },
    {
      category: "Databases & Storage",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "SQLite",
        "MariaDB",
        "Firebase Firestore",
      ],
    },
    {
      category: "Tools, Cloud & DevOps",
      skills: [
        "Git",
        "GitLab CI/CD",
        "Docker",
        "Kubernetes",
        "Red Hat OpenShift",
        "Ansible",
        "Grafana",
      ],
    },
  ],

  experience: [
    {
      id: "exp-verizon-swe",
      role: "Full Stack Software Engineer",
      company: "Verizon",
      companyUrl: "https://www.verizon.com",
      period: "Jun 2025 - Present",
      location: "Basking Ridge, NJ",
      description: [
        "Designed and developed a full stack application in React, TypeScript, Python, and Flask, using Ansible APIs to provision Linux hosts in Red Hat OpenShift and automate server OS patching for wireline applications.",
        "Implemented a GitLab CI/CD pipeline with automated testing, code scanning, and continuous Kubernetes deployment.",
        "Developed an agentic AI assistant using LangGraph and Claude’s API to autonomously execute VM lifecycle and firewall filter operations, orchestrating tool calls across internal APIs with guardrails for human oversight.",
        "Maintained highly available MongoDB (NoSQL) and MariaDB (SQL) databases supporting requests and firewall filters for 16,000+ hosts, achieving 99.9% uptime.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Python",
        "Flask",
        "LangGraph",
        "Claude API",
        "Ansible",
        "OpenShift",
        "Kubernetes",
        "GitLab CI/CD",
        "MongoDB",
        "MariaDB",
      ],
    },

    {
      id: "exp-verizon-intern",
      role: "Software Development Intern",
      company: "Verizon",
      companyUrl: "https://www.verizon.com",
      period: "Jun 2024 - Aug 2024",
      location: "Basking Ridge, NJ",
      description: [
        "Developed a Python and Flask service integrating Ansible Automation Platform APIs to orchestrate VM reconfigurations.",
        "Configured Grafana dashboards with custom thresholds for real-time Red Hat Linux server monitoring and alerts.",
        "Automated server provisioning for 80+ servers with Python, standardizing configs and reducing time from 2 weeks to 1 hour.",
      ],
      technologies: [
        "Python",
        "Flask",
        "Ansible",
        "Grafana",
        "Red Hat Enterprise Linux",
      ],
    },

    {
      id: "exp-data-annotation",
      role: "Software Engineer AI Trainer",
      company: "Data Annotation",
      period: "Aug 2023 - Present",
      location: "Remote (Freelance)",
      description: [
        "Engineered prompts across React, TypeScript, Java, Spring Boot, Python, and React Native for training LLM agentic AI coding tools in full stack web and mobile application development.",
        "Created rubrics and unit tests to evaluate code quality in instruction following, multi-step problem solving, and tool usage.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Java",
        "Spring Boot",
        "Python",
        "React Native",
        "Prompt Engineering",
        "LLM Evaluation",
      ],
    },

    {
      id: "exp-rutgers-library",
      role: "Library Assistant",
      company: "Rutgers University",
      period: "Sep 2022 - May 2025",
      location: "New Brunswick, NJ",
      description: [
        "Assisted patrons at the front desk with inquiries, reservations, technical support, and events in the Hatchery Studio.",
        "Handled phone inquiries and circulation services, including book requests, check-outs, and returns.",
      ],
      technologies: [
        "Customer Support",
        "Technical Support",
        "Event Management",
      ],
    },

    {
      id: "exp-rutgers-climit",
      role: "Technology Lead",
      company: "Rutgers CliMit",
      period: "Sep 2023 - Dec 2023",
      location: "New Brunswick, NJ",
      description: [
        "Led a student team on prototyping and presenting an application to crowdsource critical information during floods in New Brunswick.",
      ],
      technologies: ["Rapid Prototyping", "UI/UX Design", "Public Speaking"],
    },

    {
      id: "exp-rutgers-idea",
      role: "Research Intern",
      company: "Rutgers I.D.E.A.",
      period: "May 2023 - Jun 2023",
      location: "Tuckerton, NJ",
      description: [
        "Developed solutions to recover tidal flow and mitigate an invasive marsh-grass species in Grassle Marsh, NJ at the Jacques Cousteau National Estuarine Research Reserve.",
      ],
      technologies: [
        "Environmental Research",
        "Data Collection",
        "Field Analysis",
      ],
    },

    {
      id: "exp-rutgers-blueprint",
      role: "Software Engineering Fellow",
      company: "Rutgers Blueprint",
      period: "Feb 2023 - Apr 2023",
      location: "New Brunswick, NJ",
      description: [
        "Designed, developed, and presented interactive web apps to help students learn and practice React development.",
      ],
      technologies: ["React", "JavaScript", "HTML/CSS"],
    },

    {
      id: "exp-columbia-tc",
      role: "Research Intern",
      company: "Teachers College, Columbia University",
      period: "May 2021",
      location: "New York, NY",
      description: [
        "Evaluated interview data for Dr. Xiaodong Lin’s psychological research study on motivation and failure in athletes and students at the Education for Persistence & Innovation Center (EPIC).",
      ],
      technologies: [
        "Qualitative Analysis",
        "Research Methodology",
        "Educational Psychology",
      ],
    },
  ],

  projects: [
    {
      id: "proj-tabmate",
      title: "TabMate - Shared Subscriptions Splitter",
      date: "Aug 2026",
      description:
        "Full-stack application for splitting recurring expenses using a layered controller-service-repository architecture and Docker for containerized development. Features Spring Data JPA entities and REST API endpoints for custom queries and CRUD operations.",
      tags: [
        "Java",
        "Spring Boot",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Docker",
        "REST API",
      ],
      sourceUrl: "https://github.com/terrykn/tabmate",
      sourceLabel: "GitHub",
      color: "butter",
    },

    {
      id: "proj-coplay",
      title: "CoPlay",
      date: "May 2026",
      description:
        "Mobile app for watching videos and listening to music together.",
      tags: ["React Native", "TypeScript"],
      demoUrl: "https://coplay-music.vercel.app",
      demoLabel: "Landing Page",
      color: "lavender",
    },

    {
      id: "proj-portfolio",
      title: "Portfolio",
      date: "Sep 2026",
      description:
        "Personal portfolio featuring my projects and experience. Designed with customized components from React Bits, Be UI, Animata, and Aceternity.",
      tags: ["React", "TypeScript", "Next.js", "shadcn/ui"],
      demoUrl: "https://terrykn.github.io",
      demoLabel: "Website",
      color: "peach",
    },

    {
      id: "proj-lumina-landing",
      title: "Mobile App Landing Template",
      date: "May 2026",
      description:
        "Built a flexible mobile app landing page template with a beautiful, modern layout.",
      tags: [
        "React",
        "Next.js 15",
        "shadcn/ui",
        "Tailwind CSS",
        "Framer Motion",
      ],
      demoUrl: "https://lumina-landing-template.vercel.app",
      demoLabel: "Live Demo",
      sourceUrl:
        "https://github.com/terrykn/lumina-mobile-app-landing-template",
      sourceLabel: "GitHub",
      color: "sky",
    },

    {
      id: "proj-agenda",
      title: "Agenda",
      date: "Apr 2026",
      description:
        "Mobile app for tracking projects, habits, and calendar events.",
      tags: ["React", "TypeScript", "Ionic Framework", "Capacitor"],
      demoUrl: "https://get-agenda.vercel.app",
      demoLabel: "Landing Page",
      color: "mint",
    },

    {
      id: "proj-growtopia-market",
      title: "Growtopia Item Market",
      date: "Nov 2025",
      description:
        "Developed an unofficial item marketplace web application for the Growtopia MMO game.",
      tags: ["React", "JavaScript", "Firebase", "Mantine UI"],
      demoUrl: "https://growtopia-trade.vercel.app",
      demoLabel: "Website",
      color: "coral",
    },

    {
      id: "proj-lofi-pomodoro",
      title: "Lofi Pomodoro",
      date: "Jul 2025",
      description:
        "Chrome extension combining a customizable Pomodoro timer with live lo-fi music streams, featured on the Chrome Web Store.",
      tags: ["JavaScript", "HTML/CSS"],
      demoUrl: "https://chromewebstore.google.com",
      demoLabel: "Chrome Web Store",
      color: "lavender",
    },

    {
      id: "proj-postify",
      title: "Postify",
      date: "Jul 2025",
      description:
        "Created a web app for generating album and lyric posters from Spotify album and song URLs.",
      tags: ["React", "JavaScript", "RapidAPI"],
      demoUrl: "https://postify-music.vercel.app",
      demoLabel: "Website",
      sourceUrl: "https://github.com/terrykn/postify",
      sourceLabel: "Source Code",
      color: "peach",
    },

    {
      id: "proj-face-digit-classification",
      title: "Face and Digit Classification",
      date: "May 2025",
      description:
        "Benchmarked a custom implementation of MLP and Perceptron against a PyTorch baseline for classifying faces and digits, achieving 92% accuracy.",
      tags: ["Python"],
      sourceUrl: "https://github.com/terrykn/face-and-digit-classification",
      sourceLabel: "GitHub",
      color: "sky",
    },

    {
      id: "proj-recipesnap",
      title: "RecipeSnap (HackRU Spring '24 Winner)",
      description:
        "React Native mobile app with a Python and FastAPI backend that visually detects food items via Cloudflare AI image classification and Wakefern's API to generate recipes with live grocery prices from Edamam's API.",
      tags: [
        "React Native",
        "JavaScript",
        "Python",
        "FastAPI",
        "Expo",
        "Cloudflare AI",
      ],
      demoUrl: "https://devpost.com/software/recipesnap",
      demoLabel: "Devpost",
      color: "mint",
    },
  ],

  education: [
    {
      id: "edu-gatech",
      institution: "Georgia Institute of Technology",
      degree: "M.S. in Computer Science, Machine Learning Specialization",
      period: "Aug 2026 - Present",
      location: "Online (Part-Time)",
    },
    {
      id: "edu-rutgers",
      institution: "Rutgers University",
      degree: "B.A. in Computer Science and Mathematics",
      period: "Sep 2022 - May 2025",
      location: "New Brunswick, NJ",
      gpa: "3.63",
    },
  ],

  honorsAndActivities: {
    honors: [
      "Dean's List ('22 - '25)",
      "Honors College ('22 - '24)",
      "2x HackRU Winner (Fall '23, Spring '24)",
      "Rutgers Health Hack '24 Honorable Mention",
      "Rutgers Sailing - Most Valuable Sailor ('25)",
    ],
    activities: [
      "Rutgers Sailing Team",
      "Habitat for Humanity",
      "Circle K",
    ],
  },

  footer: {
    copyrightText: `© ${new Date().getFullYear()} Terry Nguyen. All rights reserved.`,
    links: [
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/terrykn",
      },
      {
        label: "Email",
        href: "mailto:terryknguyen@gmail.com",
      },
    ],
  },
};