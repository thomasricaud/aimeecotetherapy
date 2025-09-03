<template>
  <section
    id="FeedReadMoreDisplay"
  >
    <v-col>
      <v-row>
        <v-card
          class="pt-16 ma-auto"
          color="white"
          height="90vh"
          width="65vw"
        >
          <v-img
            :src="require(`@/assets/articles/${image}`)"
            class="pt-16 float-none"
            height="50vh"
            contain="true"
          />

          <v-card-text>
            <h1 class="black--text">
              {{ title }}
            </h1>
            <br>
            <p class="black--text ">
              {{ content }}
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
      content: String,
      image: String,
    },
  }
</script>
