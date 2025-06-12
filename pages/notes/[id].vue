<template>
    <div v-if="!isLoaded" class="h-full w-full p-10">Loading...</div>
    <TextEditor v-if="isLoaded" :id="notesId" />
</template>

<script setup lang="ts">
const notes = useNotes()
const notesId = useRoute().params.id as string
const isLoaded = ref(false)

onMounted(async () => {
    await notes.getById(notesId)
    isLoaded.value = true
})
</script>