<template>
  <section
    id="newtotherapy"
  >
    <v-divider />
    <v-row>
      <youtube
        :video-id="videoId"
      />
      <base-text>
        <h1>New to therapy?</h1>
        <p>Choosing what type of therapist to see can be daunting. In this video, Prof. Martin Drapeau of McGill University describes 4 basic types of therapy.</p>
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