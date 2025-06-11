import Users from "../models/users";
import JWT from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    if (event.method !== 'GET') return

    const refreshToken = getCookie(event, 'refreshToken')

    if (!refreshToken) return { status: 400, msg: 'invalid credentials' }

    try {
        const existingUser = await Users.findOne({ where: { refreshToken: refreshToken }, raw: true })

        if (!existingUser) return { status: 400, msg: 'invalid credentials' }

        const accessToken = JWT.sign({
            id: existingUser.id,
            email: existingUser.email
        }, useRuntimeConfig().ACCESS_TOKEN!, {
            expiresIn: '1m'
        })

        return { accessToken, credentials: existingUser.email }

    } catch (error) {
        return { status: 500, msg: 'internal server error' }
    }
})