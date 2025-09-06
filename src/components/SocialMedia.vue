<template>
  <div>
    <v-btn
      v-for="(item, i) in items.slice(0, large ? items.length : 3)"
      :key="i"
      fab
      class="ma-2"
      color="info"
      :small="!large"
      target="_blank"
      :href="item.src"
    >
      <v-icon dark v-text="item.icon" />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      { name: 'Messenger', icon: '$facebookMessenger', src: 'https://www.messenger.com/t/AimeeCoteTherapy' },
      { name: 'Instagram', icon: '$instagram', src: 'https://www.instagram.com/aimee_cote_therapy' },
      { name: 'Facebook', icon: '$facebook', src: 'https://www.facebook.com/AimeeCoteTherapy' },
      { name: 'Email', icon: '$email', src: 'mailto:aimee.cote.therapy@gmail.com' },
      { name: 'Phone', icon: '$phone', src: 'tel:+33622701183' },
    ]
  })
};
</script>
