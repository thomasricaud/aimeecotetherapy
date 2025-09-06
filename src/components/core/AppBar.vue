<template>
  <v-app-bar
    app
    flat
    color="primary"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />

    <v-container class="mx-auto py-0" fluid>
      <v-row align="center" no-gutters>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on" @click="$vuetify.goTo(0)">
              <SmartPicture :src="logoSrc" alt="Aimee Cote Therapy logo" img-class="mr-5" :img-style="logoStyle" />
            </span>
          </template>
          <span>{{ $t('TooltipTherapist') }}</span>
        </v-tooltip>
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          class="hidden-sm-and-down"
          text
          :to="link.href"
        >
          {{ $t(link.text) }}
        </v-btn>

        <v-spacer />
        <v-select
          v-model="$i18n.locale"
          :append-outer-icon="mdiEarth"
          item-text="text"
          item-value="locale"
          :items="langs"
          :label="$t('ChangeLanguage')"
          hide-details
          style="max-width: 150px;"
          @change="changeLocale"
        />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  // Utilities
  import SmartPicture from '@/components/SmartPicture.vue'
  import { mdiEarth } from '@mdi/js'
  import {
    mapGetters,
    mapMutations,
  } from 'vuex'

  export default {
    name: 'CoreAppBar',
    components: { SmartPicture },
    data: () => ({
      langs: [
        {
          text: 'Français',
          locale: 'fr',
        },
        {
          text: 'English',
          locale: 'en',
        },
        {
          text: 'Español',
          locale: 'es',
        },
      ],
    }),
    computed: {
      ...mapGetters(['links']),
      logoSrc () { return require('@/assets/logo.jpg') },
      logoStyle () { return 'height:48px;width:48px;object-fit:contain;display:inline-block;' },
      mdiEarth () { return mdiEarth },
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      changeLocale (locale) {
        const { name, params, query, hash } = this.$route
        if (params.lang !== locale) {
          this.$router.push({
            name,
            params: { ...params, lang: locale },
            query,
            hash,
          })
        }
        this.$i18n.locale = locale
      },
    },

  }
</script>
