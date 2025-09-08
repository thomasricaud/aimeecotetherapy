<template>
  <getting-there />
</template>

<script>
  import buildGraphFor from '@/buildGraphFor'

  export default {
    name: 'There',
    components: {
      GettingThere: () => import('@/components/core/GettingThere'),
    },
    metaInfo () {
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
      const routeName = this.$route?.name
      const lang = this.$i18n?.locale || this.$route?.params.lang || 'en'
      return {
        title: this.$t('meta.thereTitle'),
        meta: [
          {
            name: 'description',
            content: this.$t('meta.thereDesc')
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
