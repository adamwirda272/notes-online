<template>
    <div v-if="isActive" v-on:click="$emit('close')" class="fixed w-screen h-screen z-90 top-0 left-0 right-0 bottom-0">
    </div>
    <div :class="[
        'w-auto',
        'h-auto',
        'bg-[var(--header-bg)]',
        'border',
        'border-[var(--border-color)]',
        'rounded-md',
        'z-100',
        props.class,
    ]">
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isActive: boolean; class: string | string[] }>()

defineEmits<{
    (e: 'close'): void
}>()

</script>