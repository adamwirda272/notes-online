import axios from "axios";
import { defineStore } from "pinia";
import { useAppStore } from "#imports";

const useNotes = defineStore('notes', () => {
    const list = ref<Array<{ id: string, title: string, updatedAt: Date, createdAt: Date }>>([])
    const cache = ref<Array<{ id: string, content: string, updatedAt: Date, createdAt: Date }>>([])
    const isCreating = ref<boolean>(false)
    const isDeleting = ref<boolean>(false)

    const getList = async () => {
        const accessToken = await checkAuth()
        const fetch = await axios.get('/api/notes', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus(status) {
                return status <= 500
            },
        })
        if (fetch.data.noteList) {
            list.value = fetch.data.noteList
        }
    }

    const getById = async (id: string) => {
        const cached = cache.value.find(n => n.id === id)
        if (cached) {
            return
        }
        const accessToken = await checkAuth()
        const fetch = await axios.get(`/api/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus(status) {
                return status <= 500
            },
        })
        if (fetch.data.notes) {
            cache.value.push(fetch.data.notes)
        }
    }

    const createNew = async () => {
        if (isCreating.value) return
        
        const app = useAppStore()

        isCreating.value = true
        const accessToken = await checkAuth()

        const fetch = await axios.post('/api/notes', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus(status) {
                return status <= 500
            },
        })

        if (fetch.data.notes) {
            list.value.push(fetch.data.notes)
            isCreating.value = false
            navigateTo('/notes/' + fetch.data.notes.id)
            if (app.mobile) {
                app.setNav()
            }
        }
        isCreating.value = false
    }

    const updateById = async (id: string, content: string) => {
        const accessToken = await checkAuth()

        await axios.patch(`/api/notes/${id}`, {
            content: content
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus: status => status <= 500,
        })
        const note = cache.value.find(n => n.id === id)
        if (note) note.updatedAt = new Date()
        await getList()
    }

    const deleteById = async (id: string) => {
        if (isDeleting.value) return
        isDeleting.value = true
        const isCurrentWindow = window.location.pathname === '/notes/' + id
        const accessToken = await checkAuth()

        await axios.delete('/api/notes/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        cache.value = cache.value.filter(n => n.id !== id)

        isDeleting.value = false

        if (isCurrentWindow) {
            navigateTo('/notes')
        }

        await getList()
    }

    return {
        list,
        cache,
        isCreating,
        isDeleting,
        getList,
        getById,
        createNew,
        updateById,
        deleteById
    }
})

export default useNotes