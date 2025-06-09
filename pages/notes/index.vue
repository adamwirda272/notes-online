<template>
    <div :class="[
        context.isMobile ? 'text-nowrap' : '',
        context.isNavActive ? (context.isMobile ? 'opacity-0' : '') : (context.isMobile ? '' : '')
    ]" class="w-full h-full flex flex-col justify-center items-center p-10">
        <span>There is no selected notes</span>
        <CreateNotesBtn :use-icon="false" class="relative p-3 bg-[var(--article-bg)] flex flex-row items-center gap-2 text-left hover:bg-[var(--border-color)] rounded-md cursor-pointer text-nowrap"/>
    </div>
</template>
<script setup lang="ts">
    import { appState } from '#imports';

    const context = appState()
</script>