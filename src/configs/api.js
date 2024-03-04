import axios from "axios";
import { getCookies, setCookies } from "../utils/cookies";
import { getNewTokens } from "../services/tokens";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers:{
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((request) => {
    const token = getCookies("accessToken")
    if(token){
        request.headers["Authorization"] = `Bearer ${token}`
    }
    return request
}, (error)=> {
    return Promise.reject(error)
})

api.interceptors.response.use( response => {
    return response;
}, async (error) => {
    const orginalRequest = error.config;

    if(error.response.status === 401 && !orginalRequest._retry){
        orginalRequest._retry = true;

        const res = await getNewTokens()
        if(!res?.response) return;
        setCookies(res.response.data)

        console.log(orginalRequest);
        return api(orginalRequest)
    }
})

export default api;