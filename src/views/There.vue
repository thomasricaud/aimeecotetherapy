<template>
  <getting-there />
</template>

<script>
  export default {
    name: 'There',
    components: {
      GettingThere: () => import('@/components/core/GettingThere'),
    },
    metaInfo: {
      title: 'Getting There',
      meta: [
        {
          name: 'description',
          content: 'Directions and contact information for visiting Aimee Co Therapy'
        }
      ]
    }
  }
</script>
