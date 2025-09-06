<template>
    <v-img
      class="grow hidden-sm-and-down"
      contain
      max-height="200"
      width="100%"
      position="top right"
      :src="'/.netlify/images?url=' + require('@/assets/bubbles1.png') + '&format=auto'"
      :lazy-src="require('@/assets/white_wall.png')"
      :alt="$t('DecorativeBubbleAlt')"
    />
  </template>

<script>
  export default {
    name: 'BaseBubble1',
  }
</script>
