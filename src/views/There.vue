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
      return {
        title: this.$t('meta.thereTitle'),
        meta: [
          {
            name: 'description',
            content: this.$t('meta.thereDesc')
          }
        ]
      }
    }
  }
</script>
