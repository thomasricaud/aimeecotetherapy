<template>
  <section
    id="FeedReadMoreDisplay"
  >
    <v-col>
      <v-row class="pt-6">
        <v-card
          class="width-65vw mx-auto"
          color="white"
          height="90vh"
        >
          <v-img
            :src="require(`@/assets/articles/${image}`)"
            class="float-none mt-6"
            height="50vh"
            contain="true"
          />

          <v-card-text>
            <h1 class="black--text">
              {{ $i18n.t(title) }}
            </h1>
            <br>
            <p
              class="black--text "
              v-html="$i18n.t(content)"
            />
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </section>
</template>

<script>
  export default {
    name: 'BlogEntry',
    props: {
      title: String,
      content: String,
      image: String,
    },
  }
</script>
