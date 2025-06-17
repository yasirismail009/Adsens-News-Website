import type { NextApiRequest, NextApiResponse } from 'next';

const NYT_API_KEY = process.env.NYT_API_KEY;
const NYT_BASE_URL = 'https://api.nytimes.com/svc/topstories/v2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { section = 'home' } = req.query;

  if (!NYT_API_KEY) {
    return res.status(500).json({ error: 'NYT API key is not configured' });
  }

  try {
    const response = await fetch(
      `${NYT_BASE_URL}/${section}.json?api-key=${NYT_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`NYT API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching top stories:', error);
    res.status(500).json({ error: 'Failed to fetch top stories' });
  }
} 