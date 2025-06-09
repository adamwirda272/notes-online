import Notes from "~/server/models/notes";
import auth from "~/server/middlewares/auth";
import getTitle from "~/server/utilities/getTitle";

export default defineEventHandler(async (event) => {
    await auth(event)
    const userId = event.context.user.id

    if (event.method === 'GET') {
        try {
            const notesFromUser = await Notes.findAll({
                where: {
                    userId: userId
                },
                raw: true
            })

            const noteList: Array <{}> = []

            notesFromUser.forEach(n => {
                const a = {
                    id: n.id,
                    title: getTitle(n.content).substring(0, 30),
                    updatedAt: n.updatedAt,
                    createdAt: n.createdAt
                }

                noteList.push(a)
            })

            return { status: 200, noteList: noteList }
        } catch (error) {
            return { status: 500, msg: 'internal server error' }
        }
    }

    if (event.method === 'POST') {
        try {
            const createNotes = await Notes.create({ content: '<p>Untitled</p>', userId: userId })
            const newNotes = createNotes.get({ plain: true })
            const notes = {
                id: newNotes.id,
                title: getTitle(newNotes.content),
                updatedAt: newNotes.updatedAt,
                createdAt: newNotes.createdAt
            }
            return { status: 200, notes: notes }
        } catch (error) {
            return { status: 500, msg: 'internal server error' }
        }
    }
})