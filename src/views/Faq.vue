<template>
  <div class="mt-10">
    <h1 class="mb-6">{{ $t('faq.title') }}</h1>
    <ul>
      <li v-for="item in faqs" :key="item.q" class="mb-4">
        <strong>{{ $t(item.q) }}</strong>
        <p>{{ $t(item.a) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import buildGraphFor from '@/buildGraphFor'

export default {
  name: 'Faq',
  data () {
    return {
      faqs: [
        { q: 'faq.q1', a: 'faq.a1' },
        { q: 'faq.q2', a: 'faq.a2' },
        { q: 'faq.q3', a: 'faq.a3' }
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
    graph['@graph'].push(
      { '@type': 'WebSite', '@id': `${base}/#website`, url: base + '/', name: 'Aimee Cote Therapy' },
      { '@type': 'LocalBusiness', '@id': `${base}/#business`, name: 'Aimee Cote Therapy', url: base + '/' },
      {
        '@type': 'FAQPage',
        '@id': canonical,
        url: canonical,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#business` },
        mainEntity: [
          { '@type': 'Question', name: this.$t('faq.q1'), acceptedAnswer: { '@type': 'Answer', text: this.$t('faq.a1') } },
          { '@type': 'Question', name: this.$t('faq.q2'), acceptedAnswer: { '@type': 'Answer', text: this.$t('faq.a2') } },
          { '@type': 'Question', name: this.$t('faq.q3'), acceptedAnswer: { '@type': 'Answer', text: this.$t('faq.a3') } }
        ]
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

