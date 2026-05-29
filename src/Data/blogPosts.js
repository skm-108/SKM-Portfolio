const aiForHumanityPostUrl = 'https://www.linkedin.com/feed/update/urn:li:activity:7314353533430968320/';

export const featuredLinkedInPost = {
  title: 'AI for Humanity 2024 Finalist',
  platform: 'LinkedIn',
  status: 'Featured',
  url: aiForHumanityPostUrl,
  summary:
    'Featured LinkedIn post on being recognized as an AI for Humanity 2024 finalist for a high-impact AI solution.',
  note:
    'This card can be swapped for any future featured LinkedIn post by editing src/Data/blogPosts.js.'
};

export const blogPosts = [
  {
    type: 'native',
    title: 'RAG Systems Need Retrieval Discipline',
    platform: 'Portfolio Blog',
    status: 'Native Article',
    date: 'Draft',
    summary:
      'Strong answers come from chunking strategy, metadata, query rewriting, reranking, and source-aware prompting, not only from adding a vector database.',
    tags: ['RAG', 'LLMs', 'Retrieval'],
    content: [
      'Retrieval-augmented generation works best when retrieval is treated as an engineering system, not just a vector database call.',
      'The quality of answers depends on chunking strategy, metadata design, query rewriting, reranking, and prompts that force the model to stay grounded in retrieved context.',
      'For production applications, I prefer separating ingestion, embeddings, retrieval, reranking, and answer generation so each layer can be tested and improved independently.'
    ]
  },
  {
    type: 'native',
    title: 'Anomaly Detection Is an Operational Workflow',
    platform: 'Portfolio Blog',
    status: 'Native Article',
    date: 'Draft',
    summary:
      'A useful detector needs tuned thresholds, analyst feedback, explainable features, and drift monitoring so alerts stay actionable.',
    tags: ['Security ML', 'Anomaly Detection', 'Monitoring'],
    content: [
      'An anomaly detector is only useful when its alerts can become decisions.',
      'That means the model should be paired with explainable features, threshold tuning, analyst feedback, and monitoring for drift.',
      'In security settings, the goal is not only accuracy. The system must reduce noise, preserve context, and help teams prioritize what to investigate first.'
    ]
  },
  {
    type: 'external',
    title: 'LangChain and ChromaDB Work Best With Boundaries',
    platform: 'Medium',
    status: 'Add Link',
    date: 'Draft Ready',
    url: '',
    summary:
      'Use this slot for a Medium article about keeping orchestration, retrieval, embeddings, and answer generation separated in LLM applications.',
    tags: ['LangChain', 'ChromaDB', 'LLM Apps']
  }
];

export default blogPosts;
