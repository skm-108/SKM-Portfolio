import image from '../assets/AboutMe.png';
import clipMind from '../assets/clipmind-product.png';
import clipMindLogo from '../assets/clipmind-product.png';
import docuSpark from '../assets/docuspark-product.png';
import docuSparkLogo from '../assets/docuspark-logo.png';
import docuSparkQa from '../assets/docuspark-qa.png';
import auraLogo from '../assets/AURA.png';
import kissanLogo from '../assets/KISSAN SETU.png';

const githubProfile = 'https://github.com/skm-108';

export const projects = [
  {
    img: clipMind,
    name: 'Clip Mind: AI Video Assistant',
    logo: clipMindLogo,
    date: 'May 2026',
    category: 'Generative AI / Video Intelligence',
    status: 'Public GitHub',
    tech: ['Python', 'Streamlit', 'Whisper', 'Mistral API', 'Sarvam API', 'ChromaDB', 'RAG', 'FFmpeg'],
    description:
      'AI-powered video and meeting intelligence assistant that turns YouTube links or local media into transcripts, concise summaries, action items, key decisions, open questions, and chat-ready knowledge.',
    impact:
      'Built as a practical AI workflow for extracting decisions and next steps from long-form video or meeting content.',
    features: [
      'Accepts YouTube URLs and local media file paths.',
      'Supports English transcription with local Whisper and Hinglish transcription/translation through Sarvam STT.',
      'Generates titles, summaries, action items, key decisions, and open questions from transcripts.',
      'Stores transcript embeddings in ChromaDB for retrieval-augmented transcript chat.',
      'Uses a Streamlit interface with visible processing stages and a CLI pipeline for terminal use.'
    ],
    gallery: [clipMind],
    github_link: 'https://github.com/skm-108/Clip_Mind_AI-Video-Assistant',
    live_link: ''
  },
  {
    img: docuSpark,
    name: 'DocuSPARK: Semantic PDF Assistant',
    logo: docuSparkLogo,
    date: 'May 2026',
    category: 'RAG / Knowledge Systems',
    status: 'Public GitHub',
    tech: ['React', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'LangChain', 'Google Gemini API', 'ChromaDB'],
    description:
      'Modern AI-powered document assistant that lets users upload PDFs, semantically retrieve relevant chunks, and ask natural-language questions with Gemini-grounded answers.',
    impact:
      'Designed for source-aware PDF question answering with a clean full-stack architecture and a lightweight retrieval pipeline.',
    features: [
      'Uploads PDFs and extracts document text for downstream retrieval.',
      'Chunks content, creates embeddings, and stores vectors in ChromaDB.',
      'Uses LangChain orchestration for semantic search and grounded response generation.',
      'Combines a React/TypeScript frontend with a FastAPI backend.',
      'Prepared roadmap for multi-PDF chat, authentication, OCR, PDF highlighting, memory, drag-and-drop upload, and dark mode.'
    ],
    gallery: [docuSpark, docuSparkLogo, docuSparkQa],
    github_link: 'https://github.com/skm-108/DocuSPARK-Semantic-PDF-Assistant-for-Retrieval-Knowledge-',
    live_link: ''
  },
  {
    img: image,
    name: 'AURA: AI Unified Retrieval Assistant',
    logo: auraLogo,
    date: 'September 2025',
    category: 'RAG / Web Intelligence',
    status: 'Portfolio Project',
    tech: ['Python', 'LangChain', 'Ollama', 'Selenium', 'Bright Data', 'BeautifulSoup', 'Prompt Engineering'],
    description:
      'AI-driven web scraper and retrieval pipeline for extracting, interpreting, structuring, and summarizing DOM content through natural-language queries.',
    impact:
      'Applies modular prompt engineering and retrieval patterns to make web data extraction more context-aware and reusable across domains.',
    features: [
      'Extracts and parses DOM content from dynamic web pages.',
      'Uses LLM-assisted retrieval and summarization for structured outputs.',
      'Supports context-aware parsing of web content at scale.',
      'Built with modular architecture for future domain expansion.'
    ],
    github_link: 'https://github.com/skm-108/AURA--AI-based-Universal-Retrieval-Assistant',
    live_link: ''
  },
  {
    img: image,
    name: 'ANVESHAN',
    logo: image,
    date: 'November 2024',
    category: 'Emergency Response / Mobile AI',
    status: 'Private Repository',
    tech: ['Flutter', 'Firebase', 'Dart', 'Google Maps API', 'Android Studio'],
    description:
      'Mobile emergency response application integrating GPS tracking, geofencing, real-time route optimization, and AI-assisted rapid support.',
    impact:
      'Improved emergency coordination concepts through data-driven dispatch workflows and route-aware resource allocation.',
    features: [
      'GPS tracking and geofencing for emergency response zones.',
      'Real-time route optimization using Google Maps workflows.',
      'AI-driven chatbot for rapid assistance.',
      'Predictive ML models to optimize dispatch workflows.',
      'Kept private as part of a startup incubation idea and IP protection.'
    ],
    github_link: githubProfile,
    live_link: ''
  },
  {
    img: image,
    name: 'KISSAN SETU',
    logo: kissanLogo,
    date: 'August 2024',
    category: 'AgriTech / Marketplace AI',
    status: 'SIH 2024 Semi-Finalist',
    tech: ['Flutter', 'Firebase', 'Dart', 'OpenAI API', 'SQLite', 'Secure Payments'],
    description:
      'Farmer-to-consumer digital marketplace with dynamic pricing, AI chatbot support, secure payment workflows, and agricultural data analytics.',
    impact:
      'Recognized as a Smart India Hackathon 2024 semi-finalist for innovation, scalability, and direct farmer-market utility.',
    features: [
      'Connects farmers and consumers through a digital marketplace.',
      'Uses AI chatbot flows to improve user guidance and engagement.',
      'Includes dynamic pricing concepts for transparent trade.',
      'Designs secure payment workflows for marketplace transactions.',
      'Repository remains private because of ongoing startup development.'
    ],
    github_link: githubProfile,
    live_link: ''
  }
];

export default projects;
