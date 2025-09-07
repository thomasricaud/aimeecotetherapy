<template>
  <div>
    <welcome class="my-5" />

    <welcome-alert class="my-5" />

    <family class="my-5" />

    <asystem class="my-5" />

    <new-to-therapy class="my-5" />

    <my-approach class="my-5" />
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      Welcome: () => import('@/components/Welcome'),
      WelcomeAlert: () => import('@/components/WelcomeAlert'),
      Family: () => import('@/components/FamilyTherapyRow'),
      Asystem: () => import('@/components/Asystem'),
      NewToTherapy: () => import('@/components/NewToTherapy'),
      MyApproach: () => import('@/components/MyApproach'),
    },
    metaInfo () {
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
      return {
        title: this.$t('meta.homeTitle'),
        meta: [
          {
            name: 'description',
            content: this.$t('meta.homeDesc')
          }
        ],
        link: [
          { vmid: 'canonical', rel: 'canonical', href: canonical }
        ]
      }
    }
  }
</script>
