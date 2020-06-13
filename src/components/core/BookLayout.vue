<template>
  <v-container fluid>
    <v-row
      class="hidden-md-and-down"
      align="center"
      justify="space-between"
    >
      <v-col
        cols="2"
      />
      <v-col cols="8">
        <home-view />
      </v-col>
      <v-col
        cols="2"
      />
    </v-row>
    <v-row
      class="hidden-lg-and-up"
      align="center"
      justify="space-between"
    >
      <v-col>
        <home-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'CoreView',

    components: {
      HomeView: () => import('@/components/core/BookView'),
    },
  }
</script>
