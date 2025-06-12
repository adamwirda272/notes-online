import axios from "axios"
import { userStore } from "#imports"

// can be used as middleware to check credentials, is the user authorized or not
export const checkAuth = async () => {
    if (import.meta.server) return

    const fetch = await axios.get('/api/token', {
        withCredentials: true
    })

    if (!fetch.data.accessToken) return navigateTo('/')
    const user = userStore()
    user.email = fetch.data.credentials

    return fetch.data.accessToken
}

// fetch login
export const login = async (email: string, password: string) => {
    const fetch = await axios.post('api/login', {
        email: email,
        password: password
    }, {
        validateStatus: (status) => {
            return status < 500
        }
    })

    return fetch
}

// request verification code to be sent to the user email
export const sendOTP = async (email: string) => {
    const fetch = await axios.post('/api/otp', {
        email: email
    }, {
        validateStatus(status) {
            return status <= 500
        }
    })

    return fetch
}

// register
export const register = async (email: string, password: string, confirmPassword: string, verifCode: string) => {
    const fetch = await axios.post('api/register', {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        verifCode: verifCode
    }, {
        validateStatus(status) {
            return status <= 500
        },
    })

    return fetch
}

export const passwordUpdate = async (email: string, verifCode: string, newPassword: string, confirmPassword: string) => {
    const fetch = await axios.patch('/api/password', {
        email: email,
        verifCode: verifCode,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    }, {
        validateStatus(status) {
            return status <= 500
        },
    })

    return fetch
}

export const logout = async () => {
    await axios.delete('/api/logout', {
        withCredentials: true,
        validateStatus(status) {
            return status <= 500
        },
    })
}