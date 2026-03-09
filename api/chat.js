export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ferniex.vercel.app',
      'X-Title': 'FernieX AI',
    },
    body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
  });

  res.setHeader('Content-Type', response.headers.get('content-type') || 'text/event-stream');
  
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: true,
  },
};
