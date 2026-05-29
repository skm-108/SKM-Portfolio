import DRDOLogo from '../assets/DRDO.png';
import IWAILogo from '../assets/IWAI.png';
import GDGLogo from '../assets/GDG.png';

const certificateUrl = 'https://drive.google.com/file/d/1ZgL38oBI5Gj22iwp0QI0bn0Yqb0IZp4B/view?usp=sharing';
const drdoCertificateUrl = 'https://drive.google.com/file/d/1ZgL38oBI5Gj22iwp0QI0bn0Yqb0IZp4B/view?usp=sharing';
const iwaiCertificateUrl = 'https://drive.google.com/file/d/1yEcigXc_DVTiUjGXmqkSMA5yGYLRbPZj/view?usp=sharing';
const aiForHumanityPostUrl = 'https://www.linkedin.com/feed/update/urn:li:activity:7314353533430968320/';
const gdgMentorPostUrl = 'https://www.linkedin.com/posts/shivam-kumar-mishra-a68a92288_open-source-mentorship-gdg';

export const profile = {
  name: 'Shivam Kumar Mishra',
  title: 'AI/ML and Cybersecurity Engineer',
  tagline: 'Building RAG systems, ML-driven anomaly detection, and secure AI products for the new intelligence layer of software.',
  phone: '7827478342',
  email: 'sssshivam1308@gmail.com',
  location: 'New Delhi, 110059, India',
  linkedin: 'https://www.linkedin.com/in/shivam-kumar-mishra-a68a92288',
  github: 'https://github.com/skm-108',
  resume: '/resume.pdf',
  summary:
    'Computer Science undergraduate at MAIT, GGSIPU with a 9.1 CGPA and GATE 2026 qualification, focused on applied AI, retrieval systems, cybersecurity, and full-stack product engineering. I build practical AI systems across video intelligence, semantic PDF search, web retrieval, anomaly detection, and secure infrastructure.',
  highlights: [
    'GATE 2026 qualified Computer Science undergraduate with strong fundamentals across algorithms, systems, AI, and engineering mathematics.',
    'Cybersecurity and ML intern at DESIDOC, DRDO, where supervised learning pipelines reduced anomalous emails by 60% and improved spam detection accuracy by 25%.',
    'Cyber Security Analyst at Inland Waterways Authority of India, building Random Forest based anomaly detection for APT and zero-day detection workflows.',
    'Smart India Hackathon 2024 semi-finalist for KISSAN SETU, an AI-assisted farmer-to-consumer marketplace.',
    'AI for Humanity 2024 finalist and Top 700 team in the Google Cloud Agentic AI Hackathon among 9,100+ teams.',
    'Open Source Mentor at Google Developer Group, MAIT.'
  ],
  education: [
    {
      school: 'Maharaja Agrasen Institute of Technology, GGSIPU',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      period: 'August 2023 - Present',
      location: 'New Delhi, India',
      details: 'CGPA: 9.1'
    },
    {
      school: 'Kendriya Vidyalaya, Sector-12 Dwarka',
      degree: 'Senior Secondary and Secondary Education',
      location: 'New Delhi, India',
      details: 'CBSE Class XII: 94% | Class X: 93%'
    }
  ],
  coursework: [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Generative Modeling',
    'Information Security and Cryptography',
    'Vulnerability Assessment',
    'Big Data Analytics',
    'Quantum Computing',
    'Responsible AI Governance'
  ],
  experience: [
    {
      company: 'DESIDOC, DRDO (Ministry of Defence, Government of India)',
      logo: DRDOLogo,
      role: 'Cybersecurity and Machine Learning Intern',
      period: 'January 2025 - March 2025',
      location: 'New Delhi, India',
      certificateUrl: drdoCertificateUrl,
      highlights: [
        'Engineered a supervised learning based email anomaly detection system using feature engineering and PyTorch pipelines.',
        'Reduced anomalous emails by 60% and improved spam detection accuracy by 25%.',
        'Executed VAPT on mission-critical defense systems and documented risk analysis, remediation recommendations, and secure communication pathways.'
      ]
    },
    {
      company: 'Inland Waterways Authority of India (MoPSW)',
      logo: IWAILogo,
      role: 'Cyber Security Analyst Intern',
      period: 'September 2024 - October 2024',
      location: 'Noida, India',
      certificateUrl: iwaiCertificateUrl,
      highlights: [
        'Architected cybersecurity infrastructure aligned with confidentiality, integrity, and availability principles.',
        'Developed a Random Forest based anomaly detection system for APTs and zero-day attack detection.',
        'Conducted real-time network traffic analysis and system log monitoring to improve proactive incident response.'
      ]
    },
    {
      company: 'Google Developer Group, MAIT',
      logo: GDGLogo,
      role: 'Open Source Mentor',
      period: 'August 2024 - April 2025',
      location: 'New Delhi, India',
      postUrl: gdgMentorPostUrl,
      highlights: [
        'Guided 50+ peers through contributions, code reviews, collaborative workshops, technical documentation, and practical software engineering workflows.'
      ]
    }
  ],
  skillGroups: [
    {
      title: 'AI and Machine Learning',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Feature Engineering', 'Anomaly Detection']
    },
    {
      title: 'Generative AI and RAG',
      skills: ['LangChain', 'RAG', 'Prompt Engineering', 'Hugging Face', 'Google Gemini API', 'Mistral API', 'ChromaDB']
    },
    {
      title: 'NLP, Vision and Data',
      skills: ['Transformers', 'NLP', 'OpenCV', 'Computer Vision', 'Data Mining', 'Predictive Modeling']
    },
    {
      title: 'Security and Systems',
      skills: ['Information Security', 'Cryptography', 'VAPT', 'NTA', 'System Log Analysis', 'Secure Architecture']
    },
    {
      title: 'Full-Stack Engineering',
      skills: ['React', 'TypeScript', 'FastAPI', 'Node.js', 'Django', 'REST APIs', 'SQL', 'NoSQL']
    },
    {
      title: 'Languages and Tools',
      skills: ['Python', 'C++', 'Java', 'JavaScript', 'Dart', 'Flutter', 'Git', 'Linux']
    }
  ],
  skills: [
    'Python', 'C++', 'Java', 'JavaScript', 'Dart', 'React', 'TypeScript', 'FastAPI',
    'TensorFlow', 'PyTorch', 'LangChain', 'RAG', 'Hugging Face', 'ChromaDB',
    'Flutter', 'Node.js', 'Django', 'Git', 'Linux', 'Cybersecurity'
  ],
  certifications: [
    {
      title: 'Quantum Computing Certification',
      issuer: 'CDAC Hyderabad and IIT Roorkee',
      credentialUrl: certificateUrl
    },
    {
      title: 'Generative AI Certification',
      issuer: 'LangChain and Hugging Face',
      credentialUrl: certificateUrl
    },
    {
      title: 'Full-Stack Web Development Certification',
      issuer: 'Industry Training Program',
      credentialUrl: certificateUrl
    }
  ],
  achievements: [
    {
      title: 'Google Cloud Agentic AI Hackathon',
      detail: 'Ranked Top 700 of 9,100+ teams globally.'
    },
    {
      title: 'AI for Humanity 2024 Finalist',
      detail: 'Recognized for a high-impact AI solution.',
      postUrl: aiForHumanityPostUrl
    },
    {
      title: 'Smart India Hackathon 2024 Semi-Finalist',
      detail: 'Selected out of 1,000+ competing teams nationwide.'
    },
    {
      title: 'JEE Advanced 2023 & GATE 2026 Qualified',
      detail: 'Cleared both highly competitive national-level examinations.'
    },
    {
      title: 'Best Student Award 2021-2023',
      detail: 'Awarded by Knowledge 360 Class for consistent academic excellence.'
    }
  ]
};

export default profile;
