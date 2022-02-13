<template>
  <section
    id="FeedReadMoreDisplay"
  >
    <v-col>
      <v-row>
        <v-card
          color="white"
          height="90vh"
          width="65vw"
        >
          <v-img
            :src="require(`@/assets/articles/${image}`)"
            class="float-none"
            height="50vh"
            contain="true"
          />

          <v-card-text>
            <h1 class="black--text">
              {{ $i18n.t(title) }}
            </h1>
            <br>
            <p class="black--text ">
              {{ $i18n.t(content) }}
            </p>
          </v-card-text>
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
