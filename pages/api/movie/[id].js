import { API_KEY, API_BASE } from '../../../lib/tmdb'

export default async (req, res) => {

    const response = await fetch(`${API_BASE}/movie/${req.query.id}?api_key=${API_KEY}&language=pt-BR`)
    const json = await response.json()

    res.status(200).json({
        info: json
    })
}