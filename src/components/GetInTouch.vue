<template>
  <section
    id="get-in-touch"
    class="overflow-hidden"
  >
    <v-row
      class="info white--text"
      no-gutters
    >
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          :src="require('@/assets/contact.jpg')"
          :lazy-src="require('@/assets/white_wall.png')"
          :alt="$t('getInTouch.imageAlt')"
          height="100%"
        />
      </v-col>

      <v-col
        class="pa-5"
        cols="12"
        md="6"
      >
        <base-bubble-1 />

        <base-heading class="mb-5">
          {{ $t('getInTouch.title') }}
        </base-heading>

        <v-sheet
          color="transparent"
          max-width="600"
        >
          <v-text-field
            color="info"
            :label="$t('getInTouch.name')"
            solo
            flat
          />

          <v-text-field
            color="info"
            :label="$t('getInTouch.email')"
            solo
            flat
          />

          <v-text-field
            color="info"
            :label="$t('getInTouch.subject')"
            solo
            flat
          />

          <v-textarea
            color="info"
            :label="$t('getInTouch.message')"
            solo
            flat
          />

          <base-btn>{{ $t('getInTouch.send') }}</base-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
  export default {
    name: 'GetInTouch',
  }
</script>
