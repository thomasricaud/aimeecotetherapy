<template>
  <getting-there />
</template>

<script>
  export default {
    name: 'App',
    components: {
      GettingThere: () => import('@/components/core/GettingThere'),
    },
  }
</script>
