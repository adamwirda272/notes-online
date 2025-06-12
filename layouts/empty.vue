<template>
    <!--Empty layout for login, register, change password page-->
    <div class="bg-[var(--bg-color)] w-full h-full flex items-center justify-center">
        <ToggleTheme :app="app" size="28" :class="['absolute top-5 right-5']" />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '#imports';
const app = useAppStore()
</script>