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
        const title = this.$route.params.title
        return this.$store.getters.articles.find(a => a.title === title) || {}
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
