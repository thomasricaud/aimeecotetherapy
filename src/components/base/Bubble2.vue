<template>
  <v-img
    class="grow hidden-sm-and-down"
    contain
    max-height="200"
    width="100%"
    position="bottom left"
    :src="require('@/assets/bubbles2.png')"
    :lazy-src="require('@/assets/white_wall.png')"
  />
</template>

<script>
  export default {
    name: 'BaseBubble2',
  }
</script>
