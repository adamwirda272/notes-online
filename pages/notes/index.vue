<template>
    <div :class="[
        'w-full h-full flex flex-col justify-center items-center p-10',
        app.mobile ? 'text-nowrap' : '',
        app.mobile ? (app.mobile ? 'opacity-0' : '') : (app.mobile ? '' : '')
    ]">
        <span>There is no selected notes</span>

        <CreateNotesBtn :use-icon="false"
            class="relative p-3 bg-[var(--article-bg)] flex flex-row items-center gap-2 text-left hover:bg-[var(--border-color)] rounded-md cursor-pointer text-nowrap" />
    </div>
</template>
<script setup lang="ts">
const app = useAppStore()
</script>