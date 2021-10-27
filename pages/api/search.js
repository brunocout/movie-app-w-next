import { API_KEY, API_BASE } from '../../lib/tmdb'

export default async (req, res) => {

    const response = await fetch(`${API_BASE}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${req.query.q}`)
    const json = await response.json()

    res.status(200).json({
        list: json.results
    })
}


