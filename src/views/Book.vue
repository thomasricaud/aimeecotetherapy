<template>
  <book-view class="mt-10" />
</template>

<script>
  export default {
    name: 'App',
    components: {
      BookView: () => import('@/components/core/BookView'),
    },
  }
</script>
