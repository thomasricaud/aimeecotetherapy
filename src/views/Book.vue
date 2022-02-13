<template>
  <book-view class="mt-10" />
</template>

<script>
  export default {
    name: 'Book',
    components: {
      BookView: () => import('@/components/core/BookView'),
    },
  }
</script>
