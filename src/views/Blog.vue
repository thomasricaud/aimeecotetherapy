<template>
  <div>
    <banner class="mt-12" />
    <articles />
  </div>
</template>

<script>
  export default {
    name: 'Blog',
    components: {
      Articles: () => import('@/components/home/Articles'),
      Banner: () => import('@/components/home/Banner'),
    },
    metaInfo () {
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
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
        ]
      }
    }
  }
</script>
