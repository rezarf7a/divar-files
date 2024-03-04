import api from "../configs/api";
import { getCookies } from "../utils/cookies"

const getNewTokens = async () => {
    const refreshToken = getCookies("refreshToken")
    if(!refreshToken) return;

    try {
        const response = await api.post("auth/check-refresh-token", {refreshToken})
        return { response }
    } catch (error) {
        return { error }
    }
}

export { getNewTokens }