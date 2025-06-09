<template>
    <div v-on:click="context.isProfileModalActive = false" v-if="context.isProfileModalActive" class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 z-90"
    :class="[context.isMobile ? 'bg-black opacity-45' : '']"
    ></div>
    <div :class="[
        'absolute',
        'bg-[var(--header-bg)]',
        'shadow-md',
        'z-100',
        'overflow-hidden',
        context.isMobile ? 'w-full h-[80vh] bottom-0 origin-bottom' : 'w-[350px] h-auto top-[48px] right-5 rounded-xl origin-top-right',
        context.isProfileModalActive ? (context.isMobile ? 'scale-y-100 ' : 'scale-100 opacity-100') : (context.isMobile ? 'scale-y-0' : 'scale-0 opacity-0')
    ]">
        <div class="w-full p-5">{{ context.userEmail }}</div>
        <button v-on:click="signOut" class="w-full p-5 border-t border-[var(--border-color)] cursor-pointer hover:bg-[var(--border-color)] text-red-500">{{ isLoading ? 'Signing out...' : 'Sign out' }}</button>
    </div>
</template>
<script setup lang="ts">
    import { appState } from '#imports';
    import axios from 'axios';

    const context = appState()

    const isLoading = ref(false)

    const signOut = async () => {
        if (isLoading.value) return
        isLoading.value = true
        await axios.delete('/api/logout',{
            withCredentials: true,
            validateStatus(status) {
                return status <= 500
            },
        })
        navigateTo('/')
    }
</script>