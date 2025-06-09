<script setup lang="ts">
    import { appState } from '#imports';
    const context = appState()

    const props = defineProps<{
        size: string
        class: string
    }>()
</script>
<template>
    <div :class="$props.class" class="cursor-pointer p-3 rounded-full flex justify-center items-center hover:bg-[var(--shadow-color)]" v-on:click="context.changeAppTheme">
        <svg v-if="context.appTheme === 'light'" xmlns="http://www.w3.org/2000/svg" :width="$props.size" :height="$props.size" fill="currentcolor" viewBox="0 0 256 256"><path d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path></svg>
        <svg v-else-if="context.appTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" :width="$props.size" :height="$props.size" fill="#ffffff" viewBox="0 0 256 256"><path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path></svg>
    </div>
</template>