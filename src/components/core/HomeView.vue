<template>
  <div>
    <welcome />

    <recent-projects />

    <individual />

    <family />

    <about-me />

    <get-in-touch />
  </div>
</template>

<script>
  export default {
    name: 'CoreView',

    components: {
      Welcome: () => import('@/components/Welcome'),
      RecentProjects: () => import('@/components/RecentProjects'),
      Individual: () => import('@/components/IndividualTherapy'),
      Family: () => import('@/components/FamilyTherapy'),
      AboutMe: () => import('@/components/AboutMe'),
      GetInTouch: () => import('@/components/GetInTouch'),
    },
  }
</script>
