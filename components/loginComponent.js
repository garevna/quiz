'use strict'

import { sha256, sha224 } from 'MODULES/js-sha256'

const LoginComponent = ( 'login-component', {
  data () {
    return {
      cardClass: "mb-8 py-5 px-12 dark-card",
      cardHeight: 150,
      stepperColor: "#590",
      logins: null,
			login: "",
      password: "",
      showPassText: false,
      color: "#09b",
      user: {},
      registered: false,
      stage: 0,
      backIcon: 'chevron_left',
      backIconColor: "#09b",

      theFile: null,
      avatar: "https://www.themelister.com/templates/nabster/dleimages/noavatar.png",
    }
  },

  computed: {

     validLogin: function () {
       return this.login && this.logins
          .filter ( login => login.indexOf ( this.login ) !== -1 )
              .length !== 0
     },

    loginHint: function () {
      return !this.login ? "Enter login" :
             this.validLogin ? "Valid" : `User ${this.login} doesn't exist`
    },

    loginColor: function () {
        return this.validLogin ? "#09b" : "#f50"
    },

		validPassword: function () {
			  return sha256 ( this.password ) === this.user.passHash
		},

    passwordLabel: function () {
        return `Password for ${this.login}`
    },

    passColor: function () {
        return !this.validPassword ? "#f00" : "#09b"
    },

    passHint: function () {
        return !this.validPassword ? "Incorrect password" : "correct password"
    },
  },

  methods: {

    async getUserInfo () {

      if ( this.validLogin ) {
        this.user = await this.$root.$store.dispatch ( "getUserInfo", this.login )
				this.stage = 2
      }

    },

    async getLogins () {
      this.logins = Object.keys (
          await ( await fetch ( "https://garevna-js-quiz.glitch.me/forms/all" ) ).json()
      )
    },

		enter () {
			this.validPassword ? this.setUserData () :
          this.$root.$store.commit ( "breakUser" )
			this.$root.$emit ( "sign-in-finished" )
		},

    exit () {
        this.$root.$emit ( "sign-in-finished" )
        console.clear()
    },

    setUserData () {
          document.cookie = `user=${this.login}`
          document.cookie = `pass=${this.user.passHash}`
    },
  },

  created () {
      this.getLogins().then ( () => this.stage = 1 )
  },
  mounted () {
    console.clear()
  },

  template: `
  <v-container fluid fill-height>
   <v-stepper v-model="stage" dark
              class="dark-card mx-auto"
              v-if="user">
    <v-stepper-header dark>
          <v-stepper-step :complete="validLogin"
                          step="1"
                          :color="stepperColor">
          </v-stepper-step>

      <v-divider></v-divider>

          <v-stepper-step :complete="stage > 2"
                          step="2"
                          :color="stepperColor">
          </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items class="transparent" dark>
      <v-stepper-content step="1">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="login"
                        :hint="loginHint"
                        label="User login"
                        :color="loginColor"
												@change.once="getUserInfo">
          </v-text-field>
        </v-card>

        <v-btn class="transparent"
               v-if="validLogin"
               @click="getUserInfo">
          Continue
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="password"
                        autofocus
                        :hint="passHint"
                        :label="passwordLabel"
                        :append-icon="showPassText ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassText ? 'text' : 'password'"
                        @click:append="showPassText = !showPassText"
                        :color="passColor">
          </v-text-field>
        </v-card>

        <v-btn class="transparent"
               v-if="passHint === 'correct password'"
               @click="enter">
          Submit
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</v-container>
  `
})

export default LoginComponent
