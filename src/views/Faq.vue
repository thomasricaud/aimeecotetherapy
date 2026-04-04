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
        <li v-for="(item, idx) in faqs" :key="idx" class="mb-4">
          <div class="pa-4 secondary lighten-5 text-left">
            <strong class="secondary--text">{{ item.question }}</strong>
            <p class="mt-2">{{ item.answer }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SmartPicture from '@/components/SmartPicture'

export default {
  name: 'Faq',
  components: { SmartPicture },
  computed: {
    faqs () {
      return this.$store.getters.faqs
    }
  },
  metaInfo () {
    const path = this.$route?.path || '/faq'
    const canonical = `https://aimeecotetherapy.com${path.endsWith('/') ? path : path + '/'}`
    // FAQPage schema is injected by generate-static-html.js in the pre-rendered HTML.
    // Do NOT add it here via vue-meta to avoid duplicate FAQPage schema,
    // which causes Google to invalidate the structured data.
    return {
      title: this.$t('meta.faqTitle'),
      meta: [
        { name: 'description', content: this.$t('meta.faqDesc') }
      ],
      link: [
        { vmid: 'canonical', rel: 'canonical', href: canonical }
      ]
    }
  }
}
</script>

<style>
/* Intentionally left empty; FAQ uses inline styles for logo sizing */
</style>

