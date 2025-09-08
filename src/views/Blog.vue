<template>
  <div>
    <banner class="mt-12" />
    <articles />
  </div>
</template>

<script>
  import buildGraphFor from '@/buildGraphFor'

  export default {
    name: 'Blog',
    components: {
      Articles: () => import('@/components/home/Articles'),
      Banner: () => import('@/components/home/Banner'),
    },
    metaInfo () {
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
      const routeName = this.$route?.name
      const lang = this.$i18n?.locale || this.$route?.params.lang || 'en'
      return {
        title: this.$t('meta.blogTitle'),
        meta: [
          {
            name: 'description',
            content: this.$t('meta.blogDesc')
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
