import api from "../../utils/axios.js"

const getCurrentUser = async () => {
    try {
        const { data } = await api.get('/api/me')
        return data?.user || null
    } catch (error) {
        if (error.response?.status === 401) {
            // User is not authenticated yet
            return null
        }
        console.error("Failed to get current user:", error)
        return null
    }
}

export default getCurrentUser