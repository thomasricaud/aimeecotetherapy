<template>
  <section
    id="gettingthere"
    align="center"
    justify="center"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3384.641460603695!2d2.1575746630360038!3d48.90570706464473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6633498101fff%3A0x137b1a456c99b5da!2sAimee%20Cote%2C%20Therapist%2FPsychopraticienne!5e0!3m2!1sfr!2sus!4v1592126234552!5m2!1sfr!2sus"
      width="600"
      height="450"
      frameborder="0"
      style="border:0;"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
      class="float-left pa-12"
    />
    <base-heading class="ma-12">
      <h1>Getting There</h1>
    </base-heading>
    <base-text class="ma-12">
      <p>My office is located at 15, Avenue de l'Europe, near the center of Chatou, with plenty of street parking available</p>
    </base-text>
    <v-img
      :src="require(`@/assets/officeChatou.jpg`)"
      alt="Office exterior in Chatou"
      width="100%"
      class="float-left ma-12"
    />
  </section>
</template>
