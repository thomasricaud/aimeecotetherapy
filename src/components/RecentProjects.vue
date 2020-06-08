<template>
  <section
    id="recent-projects"
    class="overflow-hidden"
  >
    <base-bubble-1
      style="transform: rotate(180deg) translateX(25%)"
    />
    <v-row
      class="height"
      align="center"
      justify="center"
    >
      <v-col
        cols="10"
        md="10"
      >
        <v-alert
          border="left"
          colored-border
          color="warning"
          elevation="24"
        >
        <h1 class="display-1">
          Challenges of Isolation during the Coronavirus Pandemic
        </h1>
          <base-text class="font-weight-medium">
          <br>
            <p>
              Uncertainty about the future, anxiety about our and our loved ones' health, kids going stir-crazy and acting out, more stress on your relationship with your partner - if you are struggling with anything during isolation, reaching out and talking can help lighten the load. Please contact me if you think I can help.
            </p>
            <p>
              In this unique time, I'd like to offer virtual therapy sessions on Zoom, with the first one free of charge.
            </p><p />
          </base-text>
        </v-alert>
      </v-col>
    </v-row>
  </section>
</template>

<script>
  export default {
    name: 'RecentProjects',

    data: () => ({
      projects: [
        'project1',
        'project2',
        'project3',
        'project4',
      ],
    }),
  }
</script>
