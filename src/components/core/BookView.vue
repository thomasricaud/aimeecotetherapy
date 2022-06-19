<template>
  <section>
    <div
      class="calendly-inline-widget"
      data-url="https://calendly.com/aimee-cote-therapy"
      style="min-width:320px;height:1000px;"
    />
    <base-heading class="ma-12">
      <h1>{{ $i18n.t("BookTitle") }}</h1>
    </base-heading>
    <base-text class="ma-12">
      <p>{{ $i18n.t("Book1") }}</p>
      <li>{{ $i18n.t("Book2") }}</li>
      <li>{{ $i18n.t("Book3") }}</li>
      <li>{{ $i18n.t("Book4") }}</li>
      <li>{{ $i18n.t("Book5") }}</li>
      </br>
      <p>{{ $i18n.t("BookNoEmail") }}</p>
      <li>Email: aimee.cote.therapy@gmail.com</li>
      <li>Phone:+33 6 51 41 79 25 </li>
    </base-text>
  </section>
</template>
<script>
  export default {
    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
      document.head.appendChild(recaptchaScript)
    },
  }
</script>
