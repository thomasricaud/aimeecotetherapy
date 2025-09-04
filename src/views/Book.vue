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
    metaInfo: {
      title: 'Book a Session',
      meta: [
        {
          name: 'description',
          content: 'Schedule a therapy appointment with Aimee Co Therapy'
        }
      ]
    }
  }
</script>
