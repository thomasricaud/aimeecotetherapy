<template>
  <getting-there />
</template>

<script>
  export default {
    name: 'There',
    components: {
      GettingThere: () => import('@/components/core/GettingThere'),
    },
    metaInfo () {
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
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
        ]
      }
    }
  }
</script>
