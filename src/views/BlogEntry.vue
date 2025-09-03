<template>
  <div class="ma-5">
    <br>
    <h1 class="black--text">
      {{ $i18n.t($route.params.title) }}
    </h1>
    <br>
    <p
      class="black--text "
      v-html="$i18n.t($route.params.content)"
    />
  </div>
</template>

<script>
  export default {
    name: 'BlogEntry',
    metaInfo () {
      return {
        title: this.$i18n.t(this.$route.params.title),
        meta: [
          {
            name: 'description',
            content: this.$i18n.t(this.$route.params.content)
          }
        ]
      }
    }
  }
</script>
