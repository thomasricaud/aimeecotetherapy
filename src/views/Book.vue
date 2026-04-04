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
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
      // BreadcrumbList schema is injected by generate-static-html.js in the pre-rendered HTML.
      // Do NOT add it here via vue-meta to avoid duplicate structured data.
      return {
        title: this.$t('meta.bookTitle'),
        meta: [
          {
            name: 'description',
            content: this.$t('meta.bookDesc')
          }
        ],
        link: [
          { vmid: 'canonical', rel: 'canonical', href: canonical }
        ]
      }
    }
  }
</script>
