<template>
  <v-container class="pa-0">
    <base-subheading>On Instagram</base-subheading>

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
            :alt="post.alt"
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
        { src: 'adventurealtitude.jpg', alt: 'Hiker looking over mountains' },
        { src: 'garden.jpg', alt: 'Lush garden pathway' },
        { src: 'pigduck.jpg', alt: 'Toy pig and duck in water' },
        { src: 'rain.jpg', alt: 'Raindrops on a window' },
        { src: 'spices.jpg', alt: 'Assorted spices in bowls' },
        { src: 'sunset.jpg', alt: 'Colorful sunset over water' },
      ],
    }),
  }
</script>
