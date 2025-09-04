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
          The solution is here
        </base-heading>

        <base-text class="mb-5">
          {{ $i18n.t('AboutMe') }}
        </base-text>

        <base-subheading class="info--text">
          Therapy
        </base-subheading>

        <base-text class="mb-5">
          I'm here to help using various tools
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
              v-text="skill.name"
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
        <v-img
          :src="require('@/assets/background-balance-beach-boulder.jpg')"
          height="100%"
          alt="Balanced stones on a beach"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
  export default {
    data: () => ({
      skills: [
        {
          name: 'Individual Therapy',
          value: 100,
        },
        {
          name: 'Couple Therapy',
          value: 75,
        },
        {
          name: 'Family Therapy',
          value: 90,
        },
      ],
    }),
  }
</script>
