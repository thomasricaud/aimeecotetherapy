<template>
  <base-card dark>
    <v-img
      :src="require('@/assetsBigsize/logo.jpg')"
      :alt="$i18n.t('LogoAlt')"
      class="grey lighten-2"
      height="400"
      width="100%"
    >
      <v-row
        class="fill-height"
        align="start"
      >
        <v-col
          cols="12"
          md="7"
          offset-md="1"
        >
          <h1 class="black--text display-3 font-weight-light">
            Aimee Cote Therapy
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
