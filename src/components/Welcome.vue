<template>
  <section
    id="welcome"
    class="overflow-hidden"
  >
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-sheet
          class="primary"
          height="100vh"
          align="center"
        >
          <v-img
            :src="require('@/assets/Aimee.jpg')"
            width="70%"
            aspect-ratio="1"
          />
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-row
        >
          <v-sheet class="ma-12 pa-12">
            <base-text>
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
              <social-media large />
            </base-text>
          </v-sheet>
        </v-row>
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
