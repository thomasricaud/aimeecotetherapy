<template>
  <div class="ma-5">
    <br>
    <v-chip
      v-if="article.category"
      label
      class="mx-0 mb-2 text-uppercase"
      color="green darken-3"
      text-color="white"
      small
    >
      {{ article.category }}
    </v-chip>
    <h1 class="black--text">
      {{ article.title }}
    </h1>
    <div
      v-if="article.author"
      class="caption"
    >
      {{ article.author }}
    </div>
    <br>
    <p
      class="black--text"
      v-html="article.content"
    />
    <br>
    <v-img
      v-if="article.image && article.image !== 'hide'"
      class="mx-auto"
      :src="article.image"
      :lazy-src="require('@/assets/white_wall.png')"
      :alt="article.title"
      onerror="this.onerror=null; this.src='Default.jpg'"
      width="75%"
    />
  </div>
</template>

<script>
  export default {
    name: 'BlogEntry',
    computed: {
      article () {
        const slug = this.$route.params.slug
        return this.$store.getters.articles.find(a => a.slug === slug) || {}
      }
    },
    metaInfo () {
      const title = this.article.title || ''
      const description = this.article.description || ''
      return {
        title,
        meta: [
          { vmid: 'robots', name: 'robots', content: 'index,follow' },
          { vmid: 'description', name: 'description', content: description },
          { vmid: 'og:title', property: 'og:title', content: title },
          { vmid: 'og:description', property: 'og:description', content: description },
          { vmid: 'twitter:title', name: 'twitter:title', content: title },
          { vmid: 'twitter:description', name: 'twitter:description', content: description }
        ]
      }
    }
  }
</script>
