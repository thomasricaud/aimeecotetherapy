<template>
  <section
    id="myapproach"
  >
    <v-divider />

    <v-container>
        <SmartPicture asset-path="family.jpg" :alt="$t('MyApproachFamilyAlt')" img-class="float-md-left mx-auto ma-md-12" :img-style="'max-width:50vh;width:100%;height:auto;'" />
        <base-heading class="my-5">
          <h1>{{ $t('MyApproachTitle') }}</h1>
        </base-heading>
        <base-text>
          <br><br>
          <p v-html="$i18n.t('myapproach')" />
        </base-text>
    </v-container>
    <v-container>
        <SmartPicture asset-path="shutterstock_1316614289.jpg" :alt="$t('MyApproachTherapyAlt')" img-class="float-md-right mx-auto ma-md-12" :img-style="'max-width:50vh;width:100%;height:auto;'" />
        <base-text>
          <br><br><br><br>
          <p v-html="$i18n.t('myapproach2')" />
        </base-text>
    </v-container>
  </section>
</template>
<script>
import SmartPicture from '@/components/SmartPicture.vue'
export default {
  components: { SmartPicture },
  computed: {}
}
</script>
