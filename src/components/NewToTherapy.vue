<template>
  <section
    id="newtotherapy"
  >
    <v-divider />
    <v-row no-gutters>
      <youtube
        :video-id="videoId"
      />
      <base-text>
        <h1>{{ $t('NewToTherapyTitle') }}</h1>
        <p>{{ $t('NewToTherapyDescription') }}</p>
      </base-text>
    </v-row>
  </section>
</template>
<script>
  // Utilities
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      videoId: 'vCQNtQA9Lg0',
    }),
    computed: {
      ...mapGetters({ Prominentblog: 'prominentblog' }),
    },
  }
</script>