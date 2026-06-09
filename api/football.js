export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const today = new Date().toISOString().split('T')[0];
  const competitions = [2000, 2001, 2021, 2014, 2002, 2003, 2015, 2016];
  
  try {
    const promises = competitions.map(id =>
      fetch(`https://api.football-data.org/v4/competitions/${id}/matches?dateFrom=${today}&dateTo=${today}`, {
        headers: {'X-Auth-Token': '77ece74bf44a43b9aaa845a6b25f8703'}
      }).then(r => r.json()).catch(() => ({matches:[]}))
    );
    const results = await Promise.all(promises);
    const matches = results.flatMap(r => r.matches || []);
    res.status(200).json({matches});
  } catch(e) {
    res.status(500).json({error: e.message});
  }
}
