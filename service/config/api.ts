import axios from "axios"

const api = axios.create({
    baseURL: process.env.EXPO_BASE_API_URL,
    timeout:10000
})

api.interceptors.request.use(async (config) => {
    return config
})

api.interceptors.response.use(async (config) => {
    return config
})