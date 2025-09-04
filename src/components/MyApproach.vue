<template>
  <section
    id="myapproach"
  >
    <v-row>
      <v-divider />

      <v-container>
        <v-img
          :src="require(`@/assets/family.jpg`)"
          width="100%"
          style="max-width:50vh;"
          class="float-md-left mx-auto ma-md-12"
        />
        <base-heading class="ma-5">
          <h1>{{ $t('MyApproachTitle') }}</h1>
        </base-heading>
        <base-text>
          <br><br>
          <p v-html="$i18n.t('myapproach')" />
        </base-text>
      </v-container>
      <v-container>
        <v-img
          :src="require(`@/assets/shutterstock_1316614289.jpg`)"
          width="100%"
          style="max-width:50vh;"
          class="float-md-right mx-auto ma-md-12"
        />
        <base-text>
          <br><br><br><br>
          <p v-html="$i18n.t('myapproach2')" />
        </base-text>
      </v-container>
    </v-row>
  </section>
</template>
