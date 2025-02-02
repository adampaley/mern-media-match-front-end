const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/games`
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export const showGame = async (genres) => {
    try {
        const headers = {
            'Client-ID': `${CLIENT_ID}`,
            'Authorization': `Bearer ${API_KEY}`,
        }
        const gameDataRes = await fetch(`${API_URL}/?genres=${genres.join(',')}`, {
            method: 'POST',
            headers: headers
        })
        const data = await gameDataRes.json()
        return data
    } catch (err) {
        console.log(err)
    }
}
