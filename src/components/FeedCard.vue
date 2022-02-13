<template>
  <v-col
    cols="12"
    :md="size === 2 ? 6 : size === 3 ? 4 : undefined"
  >
    <base-card
      :height="value.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
      href="#!"
      @click="navigateTo(value.title,value.content,value.hero)"
    >
      <v-img
        :src="require(`@/assets/articles/${value.hero}`)"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-row
          class="fill-height text-right ma-0"
        >
          <v-col cols="12">
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
            >
              {{ $i18n.t(value.category) }}
            </v-chip>
            <h3 class="title font-weight-bold mb-2">
              {{ $i18n.t(value.title) }}
            </h3>
            <div class="caption">
              {{ value.author }}
            </div>
          </v-col>
          <v-col align-self="end">
            <v-chip
              class="text-uppercase ma-0"
              color="secondary"
              label
              small
            >
              Read More
            </v-chip>
          </v-col>
        </v-row>
      </v-img>
    </base-card>
  </v-col>
</template>

<script>
  export default {
    name: 'FeedCard',
    props: {
      size: {
        type: Number,
        required: true,
      },
      value: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({
      overlay: false,
    }),
    methods: {
      navigateTo (title, content, image) {
        this.$router.push({ name: 'blogentry', params: { title: title, content: content, image: image } })
      },
    },
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
