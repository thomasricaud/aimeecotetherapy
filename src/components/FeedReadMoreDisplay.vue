<template>
  <section
    id="FeedReadMoreDisplay"
  >
    <v-col>
      <v-row>
        <v-card
          class="secondary black-text fill-height pa-12 ma-12"
          min-width="50%"
        >
          <v-img
            :src="require(`@/assets/articles/${image}`)"
            max-width="50vh"
            class="float-left ma-12"
          />
          <v-card-text>
            <h1>{{ $i18n.t(title) }}</h1>

            <p>{{ $i18n.t(content) }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              icon
              @click="overlay = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </section>
</template>

<script>
  export default {
    name: 'FeedReadMoreDisplay',
    props: {
      title: String,
      content: Number,
      image: String,
    },
  }
</script>
