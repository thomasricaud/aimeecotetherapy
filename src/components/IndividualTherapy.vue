<template>
  <section
    id="individual"
    height="100vh"
    class="overflow-hidden"
  >
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col>
        <v-row>
          <v-sheet class="ma-12 pa-12">
            <base-text>
              <h1 class="display-3">As an individual you may be facing various issues</h1>
            </base-text>
          </v-sheet>
        </v-row>
      </v-col>
      <v-col
        class="secondary text-center"
      >
        <v-container
          fluid
        >
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
                  height="15vh"
                  aspect-ratio="1"
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
          src: 'adult-alone-anxious-black-and-white.jpg',
          // src: 'project1.jpeg',
        },
        {
          name: 'Individual2',
          icon: 'mdi-pencil-outline',
          blurb: 'IndividualBlurb2',
          flex: 6,
          src: 'photo-of-man-leaning-on-wooden-table.jpg',
        },
        {
          name: 'Individual3',
          icon: 'mdi-settings-outline',
          blurb: 'IndividualBlurb3',
          flex: 6,
          src: 'alone-man-person-sadness.jpg',
        },
        {
          name: 'Individual4',
          icon: 'mdi-account',
          blurb: 'IndividualBlurb4',
          flex: 12,
          src: 'project1.jpeg',
        },
      ],
      families: [
        {
          name: 'Family1',
          icon: 'mdi-clipboard-text-outline',
          blurb: 'FamilyBlurb1',
          flex: 4,
          src: 'teen-depression-anxiety-mental-health-self-harm.jpg',
        },
        {
          name: 'Family2',
          icon: 'mdi-pencil-outline',
          blurb: 'FamilyBlurb2',
          flex: 8,
          src: 'family-fighting-9920714.jpg',
        },
        {
          name: 'Family3',
          icon: 'mdi-settings-outline',
          blurb: 'FamilyBlurb3',
          flex: 6,
          src: 'talk-to-the-hand.jpg',
        },
        {
          name: 'Family4',
          icon: 'mdi-account',
          blurb: 'FamilyBlurb4',
          flex: 6,
          src: 'ordinary-young-sad-family-of-four-after-quarrel.jpg',
        },
        {
          name: 'Family5',
          icon: 'mdi-account',
          blurb: 'FamilyBlurb5',
          flex: 4,
          src: 'therapist-comforting-patient.jpg',
        },
        {
          name: 'Family6',
          icon: 'mdi-account',
          blurb: 'FamilyBlurb6',
          flex: 8,
          src: 'woman-listening-to-therapist.jpg',
        },
      ],
    }),
  }
</script>
