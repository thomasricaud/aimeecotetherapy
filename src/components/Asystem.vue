<template>
  <section id="asystem">
    <v-divider />
    <br />
    <br />
    <SmartPicture asset-path="closeup-photography-of-stacked-stones.jpg" :alt="$t('ASystemImageAlt')" img-class="float-md-right mx-auto my-12 ma-md-12" :img-style="'max-width:50vh;width:100%;height:auto;'" />
    <base-heading>
      <h1>{{ $i18n.t("ASystem") }}</h1>
    </base-heading>
    <base-text>
      <p>
        {{ $i18n.t("ASystem1") }}
      </p>
      <p>
        {{ $i18n.t("ASystem2") }}
      </p>
    </base-text>
  </section>
</template>
<script>
import SmartPicture from '@/components/SmartPicture.vue'
export default {
  components: { SmartPicture },
  computed: {}
}
</script>
