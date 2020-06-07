<template>
  <section
    id="services"
    class="overflow-hidden"
  >
    <v-row
      class="accent"
      no-gutters
    >
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
         <base-bubble-1 style="transform: translate(5%, -5%)" />
        <base-heading class="info--text">
          Family therapy
        </base-heading>
        <v-container
          fluid
        >
          <v-row>
            <v-col
              v-for="card in families"
              :key="card.name"
              class="color"
              :cols="card.flex"
            >
              <v-card>
                <v-img
                  v-if="card.src"
                  :src="require(`@/assets/${card.src}`)"
                  class="white--text"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="$i18n.t(card.name)" />
                  <v-card-text v-text="$i18n.t(card.blurb)" />
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col
        class="text-center pa-5"
        cols="12"
        md="6"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="card in individual"
              :key="card.name"
              :cols="card.flex"
            >
              <v-card>
                <v-img
                  v-if="card.src"
                  :src="require(`@/assets/${card.src}`)"
                  class="white--text"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="$i18n.t(card.name)" />
                  <v-card-text v-text="$i18n.t(card.blurb)" />
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </section>
</template>

<script>
  export default {
    name: 'Services',

    data: () => ({
      individual: [
        {
          name: 'Individual1',
          icon: 'mdi-clipboard-text-outline',
          blurb: 'IndividualBlurb1',
          flex: 12,
          src: 'project1.jpeg',
        },
        {
          name: 'Individual2',
          icon: 'mdi-pencil-outline',
          blurb: 'IndividualBlurb2',
          flex: 6,
          src: 'project1.jpeg',
        },
        {
          name: 'Individual3',
          icon: 'mdi-settings-outline',
          blurb: 'IndividualBlurb3',
          flex: 6,
          src: 'project1.jpeg',
        },
        {
          name: 'Individual4',
          icon: 'mdi-account',
          blurb: 'IndividualBlurb4',
          flex: 2,
          src: 'project1.jpeg',
        },
      ],
      families: [
        {
          name: 'Family1',
          icon: 'mdi-clipboard-text-outline',
          blurb: 'FamilyBlurb1',
          flex: 2,
          src: 'project1.jpeg',
        },
        {
          name: 'Family2',
          icon: 'mdi-pencil-outline',
          blurb: 'FamilyBlurb2',
          flex: 2,
          src: 'project1.jpeg',
        },
        {
          name: 'Family3',
          icon: 'mdi-settings-outline',
          blurb: 'FamilyBlurb3',
          flex: 2,
          src: 'project1.jpeg',
        },
        {
          name: 'Family4',
          icon: 'mdi-account',
          blurb: 'FamilyBlurb4',
          flex: 2,
          src: 'project1.jpeg',
        },
      ],
    }),
  }
</script>
