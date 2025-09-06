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
      return {
        title: this.article.title,
        meta: [
          {
            name: 'description',
            content: this.article.description || ''
          }
        ]
      }
    }
  }
</script>
