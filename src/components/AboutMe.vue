<template>
  <section
    id="about"
    class="overflow-hidden"
  >
    <v-row
      class="white"
      no-gutters
    >
      <v-col
        class="pa-5"
        cols="12"
        md="6"
      >
        <base-bubble-1 style="transform: translate(5%, -5%)" />

        <base-heading class="info--text">
          {{ $i18n.t('AboutHeading') }}
        </base-heading>

        <base-text class="mb-5">
          {{ $i18n.t('AboutMe') }}
        </base-text>

        <base-subheading class="info--text">
          {{ $i18n.t('AboutSubheading') }}
        </base-subheading>

        <base-text class="mb-5">
          {{ $i18n.t('AboutHelp') }}
        </base-text>

        <v-alert
          outlined
          color="info"
        >
          <v-row
            v-for="(skill, i) in skills"
            :key="i"
            style="color: #69A1BB;"
          >
            <v-col
              class="text-uppercase"
              cols="6"
              v-text="$i18n.t(skill.name)"
            />

            <v-col
              class="text-right"
              cols="6"
              v-text="`${skill.value}%`"
            />

            <v-progress-linear
              :value="skill.value"
              color="info"
              height="8"
            />
          </v-row>
        </v-alert>
      </v-col>

      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <SmartPicture :src="aboutImg" :alt="$t('AboutImageAlt')" img-class="aboutme__img" :img-style="'height:100%;width:100%;object-fit:cover;'" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
  import SmartPicture from '@/components/SmartPicture.vue'
  export default {
    components: { SmartPicture },
    data: () => ({
      skills: [
        {
          name: 'AboutSkillIndividual',
          value: 100,
        },
        {
          name: 'AboutSkillCouple',
          value: 75,
        },
        {
          name: 'AboutSkillFamily',
          value: 90,
        },
      ],
    }),
    computed: {
      aboutImg () { return require('@/assets/background-balance-beach-boulder.jpg') },
    },
  }
</script>
