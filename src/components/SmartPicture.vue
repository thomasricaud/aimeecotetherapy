<template>
  <picture v-if="isBitmap">
    <source :srcset="src + '.avif'" type="image/avif" />
    <source :srcset="src + '.webp'" type="image/webp" />
    <img
      :src="src"
      :alt="altText"
      :sizes="sizes || undefined"
      :class="imgClass"
      :style="imgStyle"
      :loading="loading"
      decoding="async"
    />
  </picture>
  <img v-else :src="src" :alt="altText" :class="imgClass" :style="imgStyle" :loading="loading" decoding="async" />
  
</template>

<script>
export default {
  name: 'SmartPicture',
  props: {
    src: { type: String, required: true },
    altKey: { type: String, default: '' },
    alt: { type: String, default: '' },
    sizes: { type: String, default: '' },
    imgClass: { type: [String, Object, Array], default: '' },
    imgStyle: { type: [String, Object], default: '' },
    loading: { type: String, default: 'lazy' },
  },
  computed: {
    isBitmap () {
      return /\.(jpe?g|png)$/i.test(this.src)
    },
    altText () {
      if (this.alt) return this.alt
      if (this.altKey && this.$t) return this.$t(this.altKey)
      return ''
    }
  }
}
</script>
