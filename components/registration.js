'use strict'

import { sha256, sha224 } from 'MODULES/js-sha256'

const SignUpComponent = ( 'sign-up-component', {
  data () {
    return {
      cardClass: "mb-8 py-5 px-12 dark-card",
      cardHeight: 150,
      stepperColor: "#590",
      logins: null,
      newUser: false,
      password: "",
      showPassText: false,
      color: "#09b",
      user: {
          name: "",
          lastName: "",
          password: "",
          passHash: "",
          avatar: null,
      },
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
       return this.user && this.user.login && this.logins
          .filter ( login => login.indexOf ( this.user.login ) !== -1 )
              .length === 0
     },

    loginHint: function () {
      return !this.user.login ? "" :
             this.validLogin ? "Valid" : `User ${this.user.login} already exists`
    },

    loginColor: function () {
        return this.validLogin ? "#09b" : "#fa0"
    },

    passwordLabel: function () {
        return `Password for ${this.user.login}`
    },

    passColor: function () {
        return !this.user ? "#f00" :
        this.user.password.length < 8 ? "#f00" :
            !this.user.password.match ( /[A-Z]/g ) ? "#f50" :
                !this.user.password.match ( /[a-z]/g ) ? "#e70" :
                    !this.user.password.match ( /[0-9]/g ) ? "#d90" :
                        "#09b"
    },

    passHint: function () {
        return !this.user ? "" :
        this.user.password.length < 8 ? "There must be at least 8 characters" :
            !this.user.password.match ( /[A-Z]/g ) ? "There must be at least one character in upper case" :
                !this.user.password.match ( /[a-z]/g ) ? "There must be at least one character in lower case" :
                    !this.user.password.match ( /[0-9]/g ) ? "There must be at least one digit" :
                        "correct password"
    },

    duplicatePassColor: function () {
        return this.user.password !==  this.password ? "#f50" : "#09b"
    },

    duplicatePassHint: function () {
        return this.user.password !==  this.password ? "incorrect" : "correct"
    },

    avatarHint: function () {
        return !this.theFile ? "Upload file" :
                  this.theFile.type.indexOf ( "image" ) === -1 ?
                    "Selected file is not image" :
                      this.theFile.size < 300000 ? "" + this.theFile.size :
                        "Avatar size must be less then 300Kb"
    },

    validFile: function () {
        return !!this.theFile &&
                 this.theFile.type.indexOf ( "image" ) !== -1 &&
                   this.theFile.size < 300000
    },

    avatarColor: function () {
        return this.validFile ? "#09b" : "#f50"
    }
  },
  methods: {

    async getLogins () {
      this.logins = Object.keys (
          await (
              await fetch ( "https://garevna-js-quiz.glitch.me/forms/all" )
          ).json()
      )
    },

    showPicture () {
        if ( this.validFile ) {
            this.avatar = URL.createObjectURL ( this.theFile )
        }
    },

    exit () {
        this.$root.$emit ( "sign-up-finished" )
    },

    saveUserData () {
      this.user.passHash = sha256 ( this.user.password )
      delete this.user.password
      let login = this.user.login
      delete this.user.login
      this.user.registered = new Date().toLocaleDateString()
      this.user.results = JSON.stringify ({})

      let formData = new FormData()
      for ( let prop in this.user ) {
        formData.set ( prop, this.user [ prop ] )
      }
      formData.set ( "avatar", this.theFile )

      fetch ( `https://garevna-js-quiz.glitch.me/form/${login}`, {
            method: "POST",
            body: formData
      }).then ( response => {

            document.cookie = `user=${login}`
            document.cookie = `pass=${this.user.passHash}`

            this.$root.$store.commit ( 'setUser', {
                login: login,
      					fname: this.user.lastName,
      					name: this.user.name,
                registered: new Date().toLocaleDateString(),
      					photoURL: this.theFile ? URL.createObjectURL ( this.theFile ) : null,
                passHash: this.user.passHash
    				})
            this.exit()
      })
    },
  },
  created () {
      this.getLogins().then ( () => this.stage = 1 )
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

      <v-divider></v-divider>

          <v-stepper-step :complete="stage > 3"
                          step="3"
                          :color="stepperColor">
          </v-stepper-step>


      <v-divider></v-divider>

          <v-stepper-step :complete="stage > 4"
                          step="4"
                          :color="stepperColor">
          </v-stepper-step>

      <v-divider></v-divider>

          <v-stepper-step :complete="stage > 5"
                          step="5"
                          :color="stepperColor">
          </v-stepper-step>

      <v-divider></v-divider>

          <v-stepper-step :complete="stage > 6"
                          step="6"
                          :color="stepperColor">
          </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items class="transparent" dark>
      <v-stepper-content step="1" v-if="logins">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="user.login"
                        :hint="loginHint"
                        label="User login"
                        :color="loginColor">
          </v-text-field>
        </v-card>

        <v-btn class="transparent"
               v-if="validLogin"
               @click="stage = 2">
          Continue
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="user.name"
                        autofocus
                        outlined
                        label="name"
                        hint="Your name"
                        color="#09b">
        </v-text-field>
        </v-card>

        <v-btn class="transparent"
               v-if="user.name.length > 1"
               @click="stage = 3">
          Continue
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="user.lastName"
                        autofocus
                        outlined
                        hint="last name"
                        label="Your family name"
                        color="#09b">
          </v-text-field>
        </v-card>

        <v-btn class="transparent"
               v-if="user.lastName.length > 2"
               @click="stage = 4">
          Continue
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="user.password"
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
               @click="stage = 5">
          Continue
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-text-field v-model="password"
                        autofocus
                        :hint="duplicatePassHint"
                        :label="passwordLabel"
                        :append-icon="showPassText ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassText ? 'text' : 'password'"
                        @click:append="showPassText = !showPassText"
                        :color="duplicatePassColor">
          </v-text-field>
        </v-card>

        <v-btn class="transparent"
               v-if="duplicatePassHint === 'correct'"
               @click="stage = 6">
          Continue
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="6">
        <v-card :class="cardClass"
                :height="cardHeight">
          <v-avatar size="58">
              <v-img :src="avatar"></v-img>
          </v-avatar>
          <v-file-input label="Avatar" dense
                        class="transparent"
                        v-model="theFile"
                        :hint="avatarHint"
                        :color="avatarColor"
                        @change="showPicture"
                        prepend-icon="create"
                        show-size
                        color="#09b">

          </v-file-input>
        </v-card>

        <v-btn class="transparent"
               v-if="duplicatePassHint === 'correct'"
               @click="saveUserData">
          Submit
        </v-btn>

        <v-btn transparent text @click="exit">Cancel</v-btn>
      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</v-container>
  `
})

export default SignUpComponent
