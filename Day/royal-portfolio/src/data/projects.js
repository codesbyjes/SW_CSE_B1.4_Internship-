// Central place for all project info. Add a new object here and it
// will automatically show up in the Projects grid and get its own
// detail page - no other file needs to change.
//
// coverImage: shown on the Projects grid card.
// detailImage: shown as the full-width hero banner on the detail page.
// isVideo + detailVideo: for projects where the detail page should show
// a video player instead of an image (set isVideo: true and provide
// detailVideo; detailImage is ignored for that project).
// Point image/video paths at files in /public/projects/ once you have
// them. Until a file exists, the card/detail page automatically shows
// an elegant gold placeholder instead of a broken image or video.

const projects = [
  {
    id: 'jes-quotes',
    title: 'Jes Quotes',
    category: 'Web Application',
    coverImage: '/projects/jesquotes-cover.png',
    isVideo: true,
    detailVideo: '/projects/jesquotes-detail.mp4',
    description:
      'My first project, created out of curiosity. A motivational quote application built using Python and Streamlit that surfaces meaningful quotes for users.',
    techStack: ['Python', 'Streamlit'],
    status: 'Completed',
    role: 'Solo Developer',
    objective: 'Learn Python + Streamlit by shipping a small, real, usable app.',
    github: '',
    liveDemo: 'https://jes-quotes-app-clean-vr8zzubxmfl3lx6cxm2pgz.streamlit.app/',
  },
  {
    id: 'medonco-nexus',
    title: 'MediOnco Nexus',
    category: 'Machine Learning',
    coverImage: '/projects/medonco-cover.png',
    detailImage: '/projects/medonco-detail.png',
    description:
      'Predicts a patient\u2019s cancer risk level using machine learning, helping prioritize the clinical workflow by identifying high-risk cases first.',
    techStack: ['Python', 'Machine Learning'],
    status: 'In Progress',
    role: 'Team Member',
    objective:
      'To assist hospitals, oncology departments, and healthcare centres by providing an AI-assisted breast cancer prediction system that supports early diagnosis and informed clinical decision-making.',
    github: '',
    liveDemo: '',
  },
  {
    id: 'anonymi',
    title: 'ANONYMI',
    category: 'Hackathon',
    coverImage: '/projects/anonymi-cover.png',
    detailImage: '/projects/anonymi-detail.png',
    description:
      'A privacy-focused social platform developed during a hackathon that allows users to share content without revealing their identity.',
    techStack: ['Web Development'],
    status: 'Prototype',
    role: 'Team Member',
    objective: 'Let people share content and opinions without revealing their identity.',
    github: '',
    liveDemo: '',
  },
  {
    id: 'edupro',
    title: 'EduPro',
    category: 'Concept',
    coverImage: '/projects/edupro-cover.png',
    isVideo: true,
    detailVideo: '/projects/edupro-detail.mp4',
    description:
      'Details coming soon — this space is reserved for EduPro\u2019s description, tech stack and images once the project is finalized.',
    techStack: [],
    status: 'Concept',
    role: '',
    objective: '',
    github: '',
    liveDemo: '',
  },
  {
    id: 'arduino-room-lighting',
    title: 'Automatic Room Lighting Control System',
    category: 'Embedded Systems',
    coverImage: '/projects/arduino-cover.jpg',
    detailImage: '/projects/arduino-detail.jpeg',
    description:
      'An IoT-based smart lighting solution developed using the Arduino UNO R4 WiFi. The system automatically controls room lighting based on ambient light intensity, improving energy efficiency while reducing unnecessary power consumption.',
    techStack: ['Arduino UNO R4 WiFi', 'Arduino IDE', 'Embedded C', 'LDR Sensor', 'LED'],
    status: 'Completed',
    role: 'Designed the complete circuit, programmed the Arduino board, integrated the sensors, implemented the automation logic, and tested the complete working system.',
    objective:
      'To develop an intelligent lighting system capable of automatically controlling room lights based on surrounding light levels, promoting energy conservation and smart automation.',
    github: '',
    liveDemo: '',
  },
]

export default projects
