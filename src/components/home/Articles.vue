<template>
  <section id="feed">
    <feed>
      <slot />
    </feed>
  </section>
</template>

<script>
  export default {
    name: 'Articles',

    components: {
      Feed: () => import('@/components/Feed'),
    },
  }
</script>
