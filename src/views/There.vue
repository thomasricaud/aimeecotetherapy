<template>
  <getting-there />
</template>

<script>
  export default {
    name: 'There',
    components: {
      GettingThere: () => import('@/components/core/GettingThere'),
    },
  }
</script>
