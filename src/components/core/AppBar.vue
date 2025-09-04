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
            <v-img
              :src="require('@/assets/logo.jpg')"
              :lazy-src="require('@/assets/white_wall.png')"
              class="mr-5"
              contain
              height="48"
              width="48"
              max-width="48"
              alt="Aimee Cote Therapy logo"
              @click="$vuetify.goTo(0)"
              v-on="on"
            />
          </template>
          <span>{{ $t('TooltipTherapist') }}</span>
        </v-tooltip>
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          class="hidden-sm-and-down"
          text
          :to="link .href"
        >
          {{ $t(link.text) }}
        </v-btn>

        <v-spacer />
        <v-select
          v-model="$i18n.locale"
          item-text="text"
          item-value="locale"
          :items="langs"
          hide-details
          style="width: 130px;"
          @change="changeLocale"
        >
          <template v-slot:selection>
            <div class="d-flex align-center">
              <v-icon class="mr-1">fas fa-globe</v-icon>
              {{ $t('ChangeLanguage') }}
            </div>
          </template>
        </v-select>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
  } from 'vuex'

  export default {
    name: 'CoreAppBar',
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
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      changeLocale (locale) {
        this.$i18n.locale = locale
      },
    },

  }
</script>
