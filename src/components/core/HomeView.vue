<template>
  <div>
    <welcome class="ma-12" />

    <welcome-alert />

    <family class="ma-12" />

    <asystem class="ma-12" />

    <new-to-therapy class="ma-12" />

    <my-approach class="ma-12" />
  </div>
</template>

<script>
  export default {
    name: 'CoreView',
    components: {
      Welcome: () => import('@/components/Welcome'),
      WelcomeAlert: () => import('@/components/WelcomeAlert'),
      Family: () => import('@/components/FamilyTherapyRow'),
      Asystem: () => import('@/components/Asystem'),
      NewToTherapy: () => import('@/components/NewToTherapy'),
      MyApproach: () => import('@/components/MyApproach'),
    },
  }
</script>
