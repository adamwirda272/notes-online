import auth from "~/server/middlewares/auth"
import Notes from "~/server/models/notes"

export default defineEventHandler(async (event) => {
    await auth(event)
    const userId = event.context.user.id
    const id = getRouterParam(event, 'id')

    const { content } = await readBody(event)

    try {
        await Notes.update({ content: content }, { where: { id: id, userId: userId } })
        return { status: 200 }
    } catch (error) {
        return { status: 500, msg: 'internal server error' }
    }
})