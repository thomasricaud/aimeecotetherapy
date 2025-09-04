<template>
  <v-col
    cols="12"
    :md="size === 2 ? 6 : size === 3 ? 4 : undefined"
  >
    <base-card
      color="lighten-10"
    >
      <v-row
        class="fill-height ma-0"
      >
        <v-col cols="12">
          <v-chip
            label
            class="mx-0 mb-2 text-uppercase"
            color="green darken-3"
            text-color="white"
            small
          >
            {{ value.category }}
          </v-chip>

          <h3 class="title font-weight-bold mb-2">
            {{ value.title }}
          </h3>
          <div class="caption">
            {{ value.author }}
          </div>
          <p
            v-html="value.content"
          />
          <v-img
            v-if="value.image != 'hide'"
            class="mx-auto"
            :src="require(`@/assets/articles/${value.image}`)"
            :alt="value.title"
            onerror="this.onerror=null; this.src='Default.jpg'"
            width="75%"
          /></v-img>

        </v-col>
        <v-col class="d-flex justify-center align-center">
          <youtube
            v-if="value.video != 'hide' "
            :video-id="value.video"
          />
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
