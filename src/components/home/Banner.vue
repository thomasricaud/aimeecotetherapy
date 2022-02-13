<template>
  <base-card dark>
    <v-img
      :src="require('@/assetsBigsize/logo.jpg')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row
        class="fill-height pa-3"
        align="center"
      >
        <v-col
          cols="12"
          md="7"
          offset-md="5"
        >
          <h1 class="black--text display-3 font-weight-light">
            Aimée Côté Therapy
          </h1>

          <div class="black--text subheading text-uppercase pl-2 mb-4">
            Finding Balance in your relationships
          </div>
        </v-col>
      </v-row>
    </v-img>
  </base-card>
</template>

<script>
  export default {
    name: 'HomeBanner',
  }
</script>
