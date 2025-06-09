<template>
    <div v-if="!isLoaded" class="h-full w-full p-10">Loading...</div>
    <TextEditor v-if="isLoaded" :id="notesId"/>
</template>
<script setup lang="ts">
    import { appState } from '#imports';
    import checkAuth from '~/middleware/checkAuth';
    import axios from 'axios';
    const notesId = useRoute().params.id as string
    const context = appState()

    const isLoaded = ref(false)

    async function getNotes() {
        const cached = context.notesCache.find(notes => notes.id === notesId)
        if (cached) {
            isLoaded.value = true
            return
        }
        const accessToken = await checkAuth()
        const fetch = await axios.get(`/api/notes/${notesId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`  
            },
            validateStatus(status) {
                return status <= 500
            },
        })
        context.notesCache.push(fetch.data.notes)
        isLoaded.value = true
    }

    onMounted(() => {
        getNotes()
    })
</script>