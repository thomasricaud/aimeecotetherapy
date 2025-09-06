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
      <v-icon dark :icon="item.icon" />
    </v-btn>
  </div>
</template>

<script>
import { mdiFacebookMessenger, mdiInstagram, mdiFacebook, mdiEmail, mdiPhone } from '@mdi/js'
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      { name: 'Messenger', icon: mdiFacebookMessenger, src: 'https://www.messenger.com/t/AimeeCoteTherapy' },
      { name: 'Instagram', icon: mdiInstagram, src: 'https://www.instagram.com/aimee_cote_therapy' },
      { name: 'Facebook', icon: mdiFacebook, src: 'https://www.facebook.com/AimeeCoteTherapy' },
      { name: 'Email', icon: mdiEmail, src: 'mailto:aimee.cote.therapy@gmail.com' },
      { name: 'Phone', icon: mdiPhone, src: 'tel:+33622701183' },
    ]
  })
};
</script>
