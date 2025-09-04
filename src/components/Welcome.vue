<template>
  <section id="welcome">
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-row
          no-gutters
          align="center"
        >
          <v-col class="my-5 my-md-12 pa-2">
            <v-img
              :src="require('@/assets/Aimee.jpg')"
              width="100%"
              aspect-ratio="1"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-row
          no-gutters
          align="center"
        >
          <base-text class="py-12 pl-md-6">
            <h1 class="display-3">
              {{ $i18n.t("WelcomeName") }}
            </h1>
            <br>
            <h2 class="display-1">
              {{ $i18n.t("WelcomeTitle") }}
            </h2>
            <br>
            <h2 class="headline">
              {{ $i18n.t("WelcomeTitle2") }}
            </h2>
            <br>
            <p>
              {{ $i18n.t("Welcome") }}
            </p>
            <p>
              {{ $i18n.t("Welcome2") }}
            </p>
            <social-media large />
          </base-text>
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
