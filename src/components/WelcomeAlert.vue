<template>
  <section
    id="welcome-alert"
    class="overflow-hidden"
  >
    <base-bubble-1
      style="transform: rotate(180deg) translateX(25%)"
    />
    <v-row
      class="height"
      align="center"
      justify="center"
    >
      <v-col
        cols="10"
        md="10"
      >
        <v-alert
          elevation="3"
        >
          <h1 class="display-1">
            {{ $i18n.t('homePageAlert.title') }}
          </h1>
          <base-text>
            <br>
            <p v-html="$i18n.t('homePageAlert.content')" /><p />
          </base-text>
        </v-alert>
      </v-col>
    </v-row>
  </section>
</template>
<script>
  // Utilities
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({ Prominentblog: 'prominentblog' }),
    },
  }
</script>
