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
    >
      <v-img
        :src="require(`@/assets/articles/${value.hero}`)"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-row
          v-if="!value.prominent"
          class="fill-height text-right ma-0"
        >
          <v-col cols="12">
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
              @click.stop=""
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
              color="primary"
              label
              small
              @click="overlay = !overlay"
            >
              Read More
            </v-chip>
          </v-col>
        </v-row>
      </v-img>
    </base-card>
    <v-overlay
      opacity="0.7"
      :value="overlay"
      color="primary"
    >
      <v-btn
        icon
        @click="overlay = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <feed-read-more-display
        :title="value.title"
        :content="value.content"
        :image="value.hero"
      />
    </v-overlay>
  </v-col>
</template>

<script>
  export default {
    name: 'FeedCard',
    components: {
      FeedReadMoreDisplay: () => import('@/components/FeedReadMoreDisplay'),
    },
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
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
