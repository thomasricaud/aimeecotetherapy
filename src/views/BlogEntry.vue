<template>
  <div class="ma-5">
    <br>
    <h1 class="black--text">
      {{ article.title }}
    </h1>
    <br>
    <p
      class="black--text "
      v-html="article.content"
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
