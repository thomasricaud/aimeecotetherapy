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
      const path = this.$route?.path || '/'
      const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
      const lang = this.$i18n?.locale || this.$route?.params.lang || 'en'
      const articleGraph = {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: title,
        datePublished: this.article.date,
        image: this.article.image,
        author: { '@type': 'Person', name: this.article.author },
        inLanguage: lang,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Aimee Cote Therapy',
          url: 'https://aimeecotetherapy.com/'
        },
        about: {
          '@type': 'LocalBusiness',
          name: 'Aimee Cote Therapy',
          url: 'https://aimeecotetherapy.com/'
        }
      }
      return {
        title,
        meta: [
          { vmid: 'robots', name: 'robots', content: 'index,follow' },
          { vmid: 'description', name: 'description', content: description },
          { vmid: 'og:title', property: 'og:title', content: title },
          { vmid: 'og:description', property: 'og:description', content: description },
          { vmid: 'twitter:title', name: 'twitter:title', content: title },
          { vmid: 'twitter:description', name: 'twitter:description', content: description }
        ],
        link: [
          { vmid: 'canonical', rel: 'canonical', href: canonical }
        ],
        script: [
          {
            type: 'application/ld+json',
            json: { '@context': 'https://schema.org', '@graph': [articleGraph] }
          }
        ]
      }
    }
  }
</script>
