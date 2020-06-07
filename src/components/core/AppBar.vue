<template>
  <v-app-bar
    app
    flat
    color="primary"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
    />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-img
              :src="require('@/assets/logo.jpg')"
              class="mr-5"
              contain
              height="48"
              width="48"
              max-width="48"
              @click="$vuetify.goTo(0)"
              v-on="on"
            />
          </template>
          <span>Couple, Family, and Individual Therapist</span>
        </v-tooltip>
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          text
          :to="link .href"
        >
          {{ link.text }}
        </v-btn>

        <v-spacer />
        <v-select
          v-model="$i18n.locale"
          append-outer-icon="fas fa-globe"
          item-text="text"
          item-value="locale"
          :items="langs"
          label="Change Language"
          hide-details
          style="max-width: 300px;"
          @change="changeLocale"
        />
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
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
      },
      changeLocale (locale) {
        this.$i18n.locale = locale
      },
    },

  }
</script>
