<template>
  <div id="blog">
    <v-app>
      <core-app-bar />

      <core-drawer />

      <core-view />

      <core-footer />

      <core-cta />
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'Blog',
    components: {
      CoreView: () => import('@/components/core/BlogView'),
    },
  }
</script>
