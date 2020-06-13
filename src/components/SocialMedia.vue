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
      :href= item.src
    >
      <v-icon
        dark
        v-text="item.icon"
      />
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      large: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          name: 'Messenger',
          icon: 'mdi-facebook-messenger',
          src: 'https://www.messenger.com/t/AimeeCoteTherapy',
        },
        {
          name: 'Instagram',
          icon: 'mdi-instagram',
          src: 'https://www.instagram.com/aimee_cote_therapy',
        },
        {
          name: 'Facebook',
          icon: 'mdi-facebook',
          src: 'https://www.facebook.com/AimeeCoteTherapy',
        },
        {
          name: 'Email',
          icon: 'mdi-email',
          src: 'mailto:aimee.cote.therapy@gmail.com',
        },
        {
          name: 'Phone',
          icon: 'mdi-phone',
          src: 'tel:+33621457898',
        },
      ],
    }),
  }
</script>
