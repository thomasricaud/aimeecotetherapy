<template>
  <core-view />
</template>

<script>
  export default {
    name: 'App',
    components: {
      CoreView: () => import('@/components/core/HomeLayout'),
    },
  }
</script>
