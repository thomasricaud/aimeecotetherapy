<template>
  <div>
    <welcome />

    <recent-projects />

    <services />

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
      Services: () => import('@/components/Services'),
      AboutMe: () => import('@/components/AboutMe'),
      GetInTouch: () => import('@/components/GetInTouch'),
    },
  }
</script>
