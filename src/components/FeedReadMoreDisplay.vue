<template>
  <section
    id="feedreadmoredisplay"
  >
    <v-col>
      <v-row>
        <v-card
          class="secondary black-text fill-height pa-12 ma-12"
          width="100vh"
        >
          <v-img
            :src="require(`@/assets/articles/${image}`)"
            width="50vh"
            class="float-left ma-12"
          />
          <base-heading>
            <h1>{{ $i18n.t(title) }}</h1>
          </base-heading>
          <base-text>
            <p>{{ $i18n.t(content) }}</p>
          </base-text>
        </v-card>
      </v-row>
    </v-col>
  </section>
</template>

<script>
  export default {
    props: {
      title: String,
      content: Number,
      image: String,
    },
  }
</script>
