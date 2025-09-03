<template>
  <book-view
class="mt-10"
/>
</template>

<script>
  export default {
    name: 'Book',
    components: {
      BookView: () => import('@/components/core/BookView'),
    },
    metaInfo () {
      return {
        title: this.$t('meta.bookTitle'),
        meta: [
          {
            name: 'description',
            content: this.$t('meta.bookDesc')
          }
        ]
      }
    }
  }
</script>
