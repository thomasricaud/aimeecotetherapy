<template>
  <section
    id="gettingthere"
    align="center"
    justify="center"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3384.641460603695!2d2.1575746630360038!3d48.90570706464473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6633498101fff%3A0x137b1a456c99b5da!2sAimee%20Cote%2C%20Therapist%2FPsychopraticienne!5e0!3m2!1sfr!2sus!4v1592126234552!5m2!1sfr!2sus"
      width="100%"
      style="max-width:600px; border:0;"
      height="450"
      frameborder="0"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
      class="mx-auto my-12"
    />
    <base-heading class="my-12">
      <h1>{{ $t('nav.there') }}</h1>
    </base-heading>
    <base-text class="my-12">
      <p>{{ $t('GettingThereDescription') }}</p>
    </base-text>
    <v-img
      :src="require(`@/assets/officeChatou.jpg`)"
      :alt="$t('officePhotoAlt')"
      width="100%"
      style="max-width:600px;"
      class="mx-auto my-12"
    />
  </section>
</template>
