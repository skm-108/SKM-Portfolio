import { useEffect, useState } from 'react';

const fallbackProfile = {
  source: 'manual-fallback',
  profileUrl: 'https://www.linkedin.com/in/shivam-kumar-mishra-a68a92288',
  name: 'Shivam Kumar Mishra',
  headline: 'AI/ML and Cybersecurity Engineer | RAG Systems | Secure AI Products',
  location: 'New Delhi, India',
  profileImage: '/profile-linkedin.svg',
  about: 'Computer Science undergraduate building practical AI systems across retrieval, video intelligence, cybersecurity, and full-stack product engineering.',
  featuredPosts: [],
  socialProof: []
};

export const useLinkedInProfile = () => {
  const [linkedin, setLinkedin] = useState(fallbackProfile);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const loadLinkedInProfile = async () => {
      try {
        const response = await fetch('/linkedin-profile.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('LinkedIn fallback not found');
        const data = await response.json();
        setLinkedin({ ...fallbackProfile, ...data });
        setStatus(data.source === 'manual-fallback' ? 'fallback' : 'live');
      } catch {
        setLinkedin(fallbackProfile);
        setStatus('fallback');
      }
    };

    loadLinkedInProfile();
  }, []);

  return { linkedin, status };
};

export default useLinkedInProfile;
