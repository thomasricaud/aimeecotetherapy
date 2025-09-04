<template>
  <v-container class="pa-0">
    <base-subheading>{{ $t('onInstagram') }}</base-subheading>

    <v-row>
      <v-col
        v-for="(post, i) in posts"
        :key="i"
        cols="4"
      >
        <base-card
          :href="post.href"
          color="grey lighten-2"
          height="88"
          tag="a"
        >
        <v-img
          v-if="post.src"
          :src="require(`@/assets/instagram/${post.src}`)"
          :lazy-src="require('@/assets/white_wall.png')"
          :alt="$t(post.alt)"
          height="100%"
        />
        </base-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Instagram',

    data: () => ({
      posts: [
        { src: 'adventurealtitude.jpg', alt: 'InstagramAdventureAlt' },
        { src: 'garden.jpg', alt: 'InstagramGardenAlt' },
        { src: 'pigduck.jpg', alt: 'InstagramPigDuckAlt' },
        { src: 'rain.jpg', alt: 'InstagramRainAlt' },
        { src: 'spices.jpg', alt: 'InstagramSpicesAlt' },
        { src: 'sunset.jpg', alt: 'InstagramSunsetAlt' },
      ],
    }),
  }
</script>
