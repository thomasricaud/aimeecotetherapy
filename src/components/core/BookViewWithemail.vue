<template>
  <section>
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
      <p>{{ $i18n.t("Book6") }}</p>
    </base-text>
    <form
      v-if="!savingSuccessful"
      class="contact-form"
      @submit.prevent="sendEmail"
    >
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="50"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      />
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      />
      <v-col cols="12" sm="6" md="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="prefered date"
              prepend-icon="$calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu2 = false" />
        </v-menu>
      </v-col>
      <v-textarea
        v-model="textarea"
        :error-messages="textareaErrors"
        label="Message"
        @change="$v.textarea.$touch()"
        @blur="$v.textarea.$touch()"
      />

      <v-btn class="accent mr-4" type="submit" value="Send">
        send
      </v-btn>
      <v-btn class="accent mr-4" @click="clear">
        clear
      </v-btn>
    </form>
    <v-alert v-if="savingSuccessful" type="success">
      Your email was sent we will respond shortly
    </v-alert>
  </section>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email, alphaNum } from "vuelidate/lib/validators";
import emailjs from "emailjs-com";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(50) },
    email: { required, email },
    date: {},
    textarea: { alphaNum }
  },
  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    textarea: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    savingSuccessful: false
  }),
  computed: {
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      return errors;
    },
    textareaErrors() {
      const errors = [];
      if (!this.$v.textarea.$dirty) return errors;
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 50 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    sendEmail(e) {
      emailjs
        .sendForm(
          "gmail",
          "template_W4aisDYL",
          e.target,
          "user_uCSQHcEpjWGwhD3pfhcYT"
        )
        .then(
          result => {
            console.log("SUCCESS!", result.status, result.text);
            this.clear();
            this.savingSuccessful = true;
          },
          error => {
            console.log("FAILED...", error);
          }
        );
    },
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.textarea = "";
      this.date = "";
    }
  }
};
</script>
