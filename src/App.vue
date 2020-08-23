<template>
  <v-app>
    <core-app-bar />

    <core-drawer />
    <v-container fluid>
      <v-row class="hidden-md-and-down" align="center" justify="space-between">
        <v-col cols="2" />
        <v-col cols="8">
          <router-view class="mt-10" />
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row class="hidden-lg-and-up" align="center" justify="space-between">
        <v-col>
          <router-view class="pa-0" />
        </v-col>
      </v-row>
    </v-container>

    <core-footer />
  </v-app>
</template>
<script>
export default {
  name: "App",
  components: {
    CoreDrawer: () => import("@/components/core/Drawer"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreAppBar: () => import("@/components/core/AppBar")
  }
};
</script>
