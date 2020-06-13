<template>
  <v-card
    elevation="1"
    width="740px"
    class="mx-auto"
    align="center"
  >
    <v-carousel
      cycle
    >
      <v-carousel-item
        v-for="(card,i) in families"
        :key="i"
        :src="require(`@/assets/${card.src}`)"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-card
          v-if="card.section_title"
          color="transparent"
          outlined="false"
          width="740px"
          class="fill-height"
        >
          <v-card-text class="display-2 accent--text pa-12">
            <br><br>
            <h1>{{ $i18n.t(card.blurb) }}</h1>
          </v-card-text>
        </v-card>
        <v-card
          v-else
          color="rgba(141, 191, 175, 0.6)"
          outlined="false"
          width="100%"
        >
          <v-card-text>
            <h2>{{ $i18n.t(card.blurb) }}</h2>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
<!--  <v-container
    fluid
    class="secondary text-center"
  >
    <v-row>
      <v-col
        v-for="card in families"
        :key="card.name"
        class="color"
        :cols="card.flex"
      >
        <v-card >
          <v-img
            v-if="card.src"
            :src="require(`@/assets/${card.src}`)"
            class="white--text"
            color="rgba(0,0,0,1)"
            height="20vh"
            aspect-ratio="1"
          >
            <v-card-title v-text="$i18n.t(card.name)" />
            <v-card-text v-text="$i18n.t(card.blurb)" />
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  -->
</template>

<script>
  export default {
    name: 'Services',
    data: () => ({
      families: [
        {
          section_title: 'Individual therapy Can help you with',
          name: 'IndividualTitle',
          format: 'accent--text display-1 pa-12 ma-12 ',
          blurb: 'IndividualTitle',
          src: 'white_wall.png',
          // src: 'project1.jpeg',
        },
        {
          name: 'Individual1',
          format: '',
          blurb: 'IndividualBlurb1',
          flex: 12,
          src: 'adult-alone-anxious-black-and-white.jpg',
          // src: 'project1.jpeg',
        },
        {
          name: 'Individual2',
          format: '',
          blurb: 'IndividualBlurb2',
          flex: 6,
          src: 'photo-of-man-leaning-on-wooden-table.jpg',
        },
        {
          name: 'Individual3',
          format: '',
          blurb: 'IndividualBlurb3',
          flex: 6,
          src: 'alone-man-person-sadness.jpg',
        },
        {
          name: 'Individual4',
          format: '',
          blurb: 'IndividualBlurb4',
          flex: 12,
          src: 'project1.jpeg',

        },
        {
          section_title: 'Family therapy Can help you with',
          name: 'FamilyTitle',
          format: 'accent--text display-1 pa-12 ma-12 ',
          blurb: 'FamilyTitle',
          src: 'white_wall.png',
          // src: 'project1.jpeg',
        },
        {
          name: 'Family1',
          format: '',
          blurb: 'FamilyBlurb1',
          flex: 4,
          src: 'teen-depression-anxiety-mental-health-self-harm.jpg',
        },
        {
          name: 'Family2',
          format: '',
          blurb: 'FamilyBlurb2',
          flex: 8,
          src: 'family-fighting-9920714.jpg',
        },
        {
          name: 'Family3',
          format: '',
          blurb: 'FamilyBlurb3',
          flex: 6,
          src: 'talk-to-the-hand.jpg',
        },
        {
          name: 'Family4',
          format: '',
          blurb: 'FamilyBlurb4',
          flex: 6,
          src: 'ordinary-young-sad-family-of-four-after-quarrel.jpg',
        },
        {
          name: 'Family5',
          format: '',
          blurb: 'FamilyBlurb5',
          flex: 4,
          src: 'therapist-comforting-patient.jpg',
        },
        {
          name: 'Family6',
          format: '',
          blurb: 'FamilyBlurb6',
          flex: 8,
          src: 'woman-listening-to-therapist.jpg',
        },
      ],
    }),
  }
</script>
