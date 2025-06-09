<template>
    <button v-on:click="create" :class="$props.class">
        <svg v-if="$props.useIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
        <span>New notes</span>
    </button>
</template>
<script setup lang="ts">
    import axios from 'axios';
    import checkAuth from '~/middleware/checkAuth';
    import { appState } from '#imports';

    const props = defineProps<{
        useIcon: boolean
        class: string
    }>()

    const context = appState()

    const isLoading = ref(false)

    async function create() {
        if (isLoading.value) return
        isLoading.value = true

        const accessToken = await checkAuth()

        const fetch = await axios.post('/api/notes', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus(status) {
                return status <= 500
            },
        })

        context.notelistAdd(fetch.data.notes)
        isLoading.value = false
        navigateTo('/notes/'+fetch.data.notes.id)
    }
</script>