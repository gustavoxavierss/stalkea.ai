const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "e3cd2d0d2fmsh0dced0acd30a539p1c7338jsn42c4ecbbcca6";
const RAPIDAPI_HOST = "instagram-looter2.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

const headers = {
  "x-rapidapi-host": RAPIDAPI_HOST,
  "x-rapidapi-key": RAPIDAPI_KEY,
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { action, username, id, query, count, tab, page, city_id } = req.query;

  try {
    let url;

    switch (action) {
      case "id":
        if (!username) return res.status(400).json({ error: "username obrigatório" });
        url = `${BASE_URL}/id?username=${encodeURIComponent(username)}`;
        break;

      case "profile":
        if (!username && !id) return res.status(400).json({ error: "username ou id obrigatório" });
        url = username
          ? `${BASE_URL}/profile2?username=${encodeURIComponent(username)}`
          : `${BASE_URL}/profile2?id=${id}`;
        break;

      case "web-profile":
        if (!username) return res.status(400).json({ error: "username obrigatório" });
        url = `${BASE_URL}/web-profile?username=${encodeURIComponent(username)}`;
        break;

      case "feeds":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/user-feeds2?id=${id}&count=${count || 12}`;
        break;

      case "reels":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/reels?id=${id}&count=${count || 12}`;
        break;

      case "reposts":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/user-reposts?id=${id}`;
        break;

      case "tagged":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/user-tags?id=${id}&count=${count || 12}`;
        break;

      case "related":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/related-profiles?id=${id}`;
        break;

      case "search-users":
        if (!query) return res.status(400).json({ error: "query obrigatório" });
        url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&select=users`;
        break;

      case "search-locations":
        if (!query) return res.status(400).json({ error: "query obrigatório" });
        url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&select=locations`;
        break;

      case "search":
        if (!query) return res.status(400).json({ error: "query obrigatório" });
        url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
        break;

      case "post":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/post?id=${id}`;
        break;

      case "location-info":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/location-info?id=${id}`;
        break;

      case "location-feeds":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/location-feeds?id=${id}&tab=${tab || "ranked"}`;
        break;

      case "locations":
        if (!city_id) return res.status(400).json({ error: "city_id obrigatório" });
        url = `${BASE_URL}/locations?city_id=${city_id}&page=${page || 1}`;
        break;

      case "sections":
        url = `${BASE_URL}/sections`;
        break;

      case "section":
        if (!id) return res.status(400).json({ error: "id obrigatório" });
        url = `${BASE_URL}/section?id=${id}&count=${count || 20}`;
        break;

      // Ação padrão: busca perfil por username (compatível com api.php original)
      default:
        if (!username) return res.status(400).json({ error: "Informe action e username/id" });
        url = `${BASE_URL}/profile2?username=${encodeURIComponent(username)}`;
        break;
    }

    const response = await fetch(url, { headers });
    const data = await response.json();

    return res.status(200).json({
      status_http: response.status,
      resposta_api: data,
    });

  } catch (err) {
    return res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
