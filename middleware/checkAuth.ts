import axios from "axios"
import { appState } from "#imports"

export default async function checkAuth() {
    if (import.meta.server) return

    const fetch = await axios.get('/api/token', {
        withCredentials: true
    })

    if(!('accessToken' in fetch.data)) return navigateTo('/')
    
    const context = appState()

    context.userEmail = fetch.data.credentials

    return fetch.data.accessToken
}