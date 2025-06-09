<script lang="ts">
    definePageMeta({
        layout: 'empty'
    })
    import checkAuth from '~/middleware/checkAuth';
    checkAuth()
</script>
<template>
    <Login/>
</template>