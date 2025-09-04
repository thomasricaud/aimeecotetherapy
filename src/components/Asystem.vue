<template>
  <section id="asystem">
    <v-divider />
    <br />
    <br />
    <v-img
      :src="require(`@/assets/closeup-photography-of-stacked-stones.jpg`)"
      :lazy-src="require('@/assets/white_wall.png')"
      width="100%"
      style="max-width:50vh;"
      class="float-md-right mx-auto my-12 ma-md-12"
    />
    <base-heading>
      <h1>{{ $i18n.t("ASystem") }}</h1>
    </base-heading>
    <base-text>
      <p>
        {{ $i18n.t("ASystem1") }}
      </p>
      <p>
        {{ $i18n.t("ASystem2") }}
      </p>
    </base-text>
  </section>
</template>
