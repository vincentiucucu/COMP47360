import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const isDevelopment = import.meta.env.MODE === 'development'
const baseURL = isDevelopment ? import.meta.env.VITE_API_URL_LOCAL : import.meta.env.VITE_API_URL_PROD

const api = axios.create({
    baseURL: baseURL
})

api.interceptors.request.use(
    (config) => {
       const token = localStorage.getItem(ACCESS_TOKEN);
       if (token){
        config.headers.Authorization = `Bearer ${token}`
       }
       return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api