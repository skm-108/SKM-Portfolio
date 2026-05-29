import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

if (!OPENAI_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. The assistant proxy will return 503 until configured.');
}

app.post('/api/assistant', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'missing prompt' });
  if (!OPENAI_KEY) return res.status(503).json({ error: 'OPENAI_API_KEY not configured on server' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant answering questions about a software engineer portfolio. Keep answers concise and recruiter-focused.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: 'Upstream error', detail: text });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || '';
    return res.json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'server_error', detail: String(err) });
  }
});

app.listen(port, () => {
  console.log(`Assistant proxy listening on http://localhost:${port}`);
});
