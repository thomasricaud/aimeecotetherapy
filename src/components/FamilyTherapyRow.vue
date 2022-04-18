<template>
  <section
    id="family"

    class="overflow-hidden"
  >
    <v-row
      class="fill-height"
      no-gutters
      align="center"
      justify="center"
    >
      <v-sheet
        width="100%"
        class="ma-5 pa-1"
      >
        <base-text>
          <h1 align="center">
            Therapy can help you with
          </h1>
        </base-text>
      </v-sheet>

      <family-table />
    </v-row>
  </section>
</template>

<script>
  export default {
    name: 'Services',
    components: {
      FamilyTable: () => import('@/components/FamilyTherapyTable'),
    },
  }
</script>
