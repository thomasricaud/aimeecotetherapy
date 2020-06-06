<template>
  <div id="home">
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
    name: 'Home',

    components: {
      CoreView: () => import('@/components/core/HomeView'),
    },
  }
</script>
