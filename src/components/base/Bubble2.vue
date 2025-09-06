<template>
    <v-img
      class="grow hidden-sm-and-down"
      contain
      max-height="200"
      width="100%"
      position="bottom left"
      :src="'/.netlify/images?url=' + require('@/assets/bubbles2.png') + '&format=auto'"
      :lazy-src="require('@/assets/white_wall.png')"
      :alt="$t('DecorativeBubbleAlt')"
    />
  </template>

<script>
  export default {
    name: 'BaseBubble2',
  }
</script>
