<template>
  <section>
    <div
      class="calendly-inline-widget"
      data-url="https://calendly.com/aimee-cote-therapy"
      style="height:1500px;overflow:hidden;"
    />
  </section>
</template>
<script>
  export default {
    mounted () {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
      document.head.appendChild(recaptchaScript)
    },
  }
</script>
