<template>
  <book-view
class="mt-10"
/>
</template>

<script>
  import buildGraphFor from '@/buildGraphFor'

  export default {
    name: 'Book',
    components: {
      BookView: () => import('@/components/core/BookView'),
    },
    metaInfo () {
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
      const routeName = this.$route?.name
      const lang = this.$i18n?.locale || this.$route?.params.lang || 'en'
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
        ],
        script: [
          {
            type: 'application/ld+json',
            json: buildGraphFor(routeName, lang, this.$t.bind(this))
          }
        ]
      }
    }
  }
</script>
