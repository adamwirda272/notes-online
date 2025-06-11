import Users from "../models/users";

export default defineEventHandler(async (event) => {
    if (event.method !== 'DELETE') return

    const refreshToken = getCookie(event, 'refreshToken')

    if (refreshToken) {
        await Users.update({ refreshToken: null }, { where: { refreshToken: refreshToken } })
        deleteCookie(event, 'refreshToken')
    }

    return { status: 200, msg: 'logout success' }
})