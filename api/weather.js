export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  
  const { endpoint, ...params } = req.query;
  const qs = new URLSearchParams({...params, appid: process.env.WEATHER_API_KEY}).toString();
  
  const response = await fetch(`https://api.openweathermap.org/${endpoint}?${qs}`);
  const data = await response.json();
  res.status(response.status).json(data);
}
