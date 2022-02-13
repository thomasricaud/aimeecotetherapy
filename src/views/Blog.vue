<template>
  <div>
    <articles>
      <banner class="mt-10" />
    </articles>

    <about />

    <subscribe />

    <social />
  </div>
</template>

<script>
  export default {
    name: 'CoreView',
    components: {
      Articles: () => import('@/components/home/Articles'),
      Banner: () => import('@/components/home/Banner'),
    },
  }
</script>
