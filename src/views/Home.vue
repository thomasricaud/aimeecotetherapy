<template>
  <div>
    <welcome class="ma-5" />

    <welcome-alert />

    <family class="ma-5" />

    <asystem class="ma-5" />

    <new-to-therapy class="ma-5" />

    <my-approach class="ma-5" />
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
    metaInfo: {
      title: 'Home',
      meta: [
        {
          name: 'description',
          content: 'Overview of therapy services and approach at Aimee Co Therapy'
        }
      ]
    }
  }
</script>
