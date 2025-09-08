<template>
  <div>
    <div class="text-center mx-auto mt-16 px-4" style="max-width: 700px;">
      <SmartPicture
        asset-path="logo.jpg"
        alt-key="faq.logoAlt"
        img-class="mx-auto mb-6"
        img-style="max-width: 200px; width: 100%;"
      />
      <h1 class="mb-6 primary--text">{{ $t('faq.title') }}</h1>
      <ul class="pa-0">
        <li v-for="item in faqs" :key="item.q" class="mb-4">
          <div class="pa-4 secondary lighten-5 text-left">
            <strong class="secondary--text">{{ $t(item.q) }}</strong>
            <p class="mt-2">{{ $t(item.a) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import buildGraphFor from '@/buildGraphFor'
import SmartPicture from '@/components/SmartPicture'

export default {
  name: 'Faq',
  components: { SmartPicture },
  data () {
    return {
      faqs: [
        { q: 'faq.q1', a: 'faq.a1' },
        { q: 'faq.q2', a: 'faq.a2' },
        { q: 'faq.q3', a: 'faq.a3' },
        { q: 'faq.q4', a: 'faq.a4' },
        { q: 'faq.q5', a: 'faq.a5' },
        { q: 'faq.q6', a: 'faq.a6' },
        { q: 'faq.q7', a: 'faq.a7' },
        { q: 'faq.q8', a: 'faq.a8' },
        { q: 'faq.q9', a: 'faq.a9' },
        { q: 'faq.q10', a: 'faq.a10' }
      ]
    }
  },
  metaInfo () {
    const path = this.$route?.path || '/faq'
    const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
    const routeName = this.$route?.name || 'faq'
    const lang = this.$i18n?.locale || this.$route?.params.lang || 'en'
    const graph = buildGraphFor(routeName, lang, this.$t.bind(this))
    const base = 'https://aimeecotetherapy.com'
    const mainEntity = this.faqs.map(f => ({
      '@type': 'Question',
      name: this.$t(f.q),
      acceptedAnswer: { '@type': 'Answer', text: this.$t(f.a) }
    }))
    graph['@graph'].push(
      { '@type': 'WebSite', '@id': `${base}/#website`, url: base + '/', name: 'Aimee Cote Therapy' },
      { '@type': 'LocalBusiness', '@id': `${base}/#business`, name: 'Aimee Cote Therapy', url: base + '/' },
      {
        '@type': 'FAQPage',
        '@id': canonical,
        url: canonical,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#business` },
        mainEntity
      }
    )
    return {
      title: this.$t('meta.faqTitle'),
      meta: [
        { name: 'description', content: this.$t('meta.faqDesc') }
      ],
      link: [
        { vmid: 'canonical', rel: 'canonical', href: canonical }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: graph
        }
      ]
    }
  }
}
</script>

<style>
/* Intentionally left empty; FAQ uses inline styles for logo sizing */
</style>

