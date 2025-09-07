<template>
  <div>
    <picture v-if="hasModernVariant && resolved">
      <source v-if="avifSrc" :srcset="avifSrc" type="image/avif" />
      <source v-if="webpSrc" :srcset="webpSrc" type="image/webp" />
      <img :src="imgSrc" :alt="altText" :sizes="sizes || undefined" :class="imgClass" :style="imgStyle" :loading="loading" decoding="async" />
    </picture>
    <div v-else class="smart-picture-fallback">{{ fallbackMessage }}</div>
  </div>
  
</template>

<script>
export default {
  name: 'SmartPicture',
  props: {
    src: { type: String, required: false, default: '' },
    // Relative to @/assets, including extension, e.g. 'Aimee.jpg' or 'team/photo.jpg'
    assetPath: { type: String, required: false, default: '' },
    altKey: { type: String, default: '' },
    alt: { type: String, default: '' },
    sizes: { type: String, default: '' },
    imgClass: { type: [String, Object, Array], default: '' },
    imgStyle: { type: [String, Object], default: '' },
    loading: { type: String, default: 'lazy' },
    fallbackText: { type: String, default: 'Image optimisée manquante. Exécutez `npm run picture:optimize`.' },
  },
  data () {
    return {
      hasModernVariant: false,
      imgSrc: '',
      webpSrc: '',
      avifSrc: '',
      resolved: false,
    }
  },
  computed: {
    altText () {
      if (this.alt) return this.alt
      if (this.altKey && this.$t) return this.$t(this.altKey)
      return ''
    },
    fallbackMessage () {
      return this.fallbackText
    }
  },
  watch: {
    assetPath: { immediate: true, handler () { this.resolveFromAssets() } }
  },
  methods: {
    resolveFromAssets () {
      // Require-time resolution from src/assets to ensure files are bundled and existence is known
      try {
        const ctx = require.context('@/assets', true, /\.(jpe?g|png|webp|avif)$/)
        const keyBase = this.assetPath ? './' + this.assetPath.replace(/^[./]+/, '') : ''
        if (!keyBase) { this.resolved = false; this.hasModernVariant = false; return }
        const hasJpgOrPng = ctx.keys().includes(keyBase)
        const keyWebp = keyBase + '.webp'
        const keyAvif = keyBase + '.avif'
        const hasWebp = ctx.keys().includes(keyWebp)
        const hasAvif = ctx.keys().includes(keyAvif)
        if (hasJpgOrPng) this.imgSrc = ctx(keyBase)
        this.webpSrc = hasWebp ? ctx(keyWebp) : ''
        this.avifSrc = hasAvif ? ctx(keyAvif) : ''
        this.hasModernVariant = !!(hasWebp || hasAvif)
        this.resolved = hasJpgOrPng
      } catch (e) {
        this.resolved = false
        this.hasModernVariant = false
      }
    }
  }
}
</script>

<style scoped>
.smart-picture-fallback {
  font-size: 12px;
  color: #555;
}
</style>
