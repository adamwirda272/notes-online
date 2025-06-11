import JWT from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const token = getHeader(event, "Authorization")?.slice(7)

    if (!token) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const decoded = JWT.verify(token, useRuntimeConfig().ACCESS_TOKEN!)

        if (!decoded) {
            throw createError({ statusCode: 401, message: 'Unauthorized' })
        }

        event.context.user = decoded
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Invalid or expired token' })
    }
})
