<template>
  <section
    id="welcome"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col>
        <v-card
          color="primary"
          height="100vh"
          align="center"
          justify="center"
          tile
        >
          <v-img
            :src="require('@/assets/Aimee.jpg')"
            height="70vh"
            width="50vh"
          />
        </v-card>
      </v-col>

      <v-col
        class="align-content-space-between layout wrap"
        cols="12"
        md="6"
        :pa-5="$vuetify.breakpoint.smAndDown"
      >
        <base-bubble-1
          style="transform: rotate(180deg) translateY(25%)"
        />

        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="10"
            md="9"
          >
            <h1 class="display-3">
              {{ $i18n.t('WelcomeName') }}
            </h1></br>
            <h2 class="display-1">
              {{ $i18n.t('WelcomeTitle') }}
            </h2></br>
            <h2 class="headline">
              {{ $i18n.t('WelcomeTitle2') }}
            </h2></br>
            <p>
              {{ $i18n.t('Welcome') }}
            </p>
            <p>
              {{ $i18n.t('Welcome2') }}
            </p>
            <social-media large/>
          </v-col>
        </v-row>

        <base-bubble-2
          style="transform: rotate(180deg) translate(-200px, -15%)"
        />
      </v-col>
    </v-row>
  </section>
</template>
<script>
  export default {
    name: 'Welcome',

    components: {
      SocialMedia: () => import('@/components/SocialMedia'),
    },
  }
</script>