'use strict'

import Vue from 'vue'

import Vuetify from 'vuetify'
Vue.use ( Vuetify )
import vuetifyCSS from 'MODULES/vuetify/dist/vuetify.min.css'

import googleFonts from 'CSS/googleFonts.css'

import NavigationPanel from 'JS/NavigationPanel'
import appFooter from 'JS/appFooter'
import QuizComponent from 'JS/QuizComponent'
import SignUpComponent from 'JS/registration.js'
import LoginComponent from 'JS/loginComponent'
import UserInfo from 'JS/userInfo'

import store from 'JS/DataStore'

import rootCSS from 'CSS/root.css'
import mainCSS from 'CSS/main.css'
import forVuetify from 'CSS/forVuetify.css'

import Parallax from 'JS/parallax'
import Canvas from 'JS/CanvasComponent'


new Vue ({
	vuetify: new Vuetify(),
	store,
	data () {
		return {
			mainDataSource: "data/mainData.json",
			drawer: null,
			startQuiz: false,
			level: 1,
			mainQuizData: null,
			quizResults: {
	        score: 0,
	        lives: 0,
	        maxScore:0
	    },
			sign_in_process: false,
			sign_up_process: false,
			login: false,
			showInfo: false,
			winHeight: window.innerHeight,
			winWidth: window.innerWidth
		}
	},
	computed: {
		user () { return this.$store.state.userInfo },
		mainMenuReady () { return this.$store.getters.mainMenuReady },
		mainMenuItems () { return this.$store.getters.mainMenuItems },
		quizReady () { return this.$store.state.quizReady },
		showFooter () { return !this.startQuiz && this.winHeight > 700 }
	},

	created () {

	},

	mounted () {

		this.getMainData()
				.then ( response => console.log ( response ) )

		let folderName = decodeURI ( location.hash ).slice(1).trim()

		this.$on ( 'start-quiz', function ( val ) {
				!this.login ? this.sign_in_process = true : this.startQuiz = true
		})

		this.$on ( 'exit-quiz', function () {
			  location.hash = ""
				this.startQuiz = false
		})

		this.$on ( 'closeNavigationPanel', function () {
				this.drawer = false
		})

		this.$on ( 'close-info', function () {
			this.showInfo = false
		})

		this.$on ( 'navigation-drawer-state', function ( val ) {
				this.drawer = val
		})

		this.$on ( 'sign-in-finished', function () {
				this.sign_in_process = false

		})

		this.$on ( 'sign-up-finished', function () {
				this.sign_up_process = false
		})

		this.$vuetify.theme = {
				primary: '#234',
				secondary: '#fa0',
				accent: '#f50',
				error: '#d00',
				info: '#09b',
				success: '#050',
				warning: '#fa0',
				codeSection: "#00000000"
		}

		this.getCookies ()
		    .then ( this.sign_in_process = !this.login ? true : false )
		this.windowResized ()
	},

	methods: {

		async getMainData () {
			let response = await ( await fetch ( this.mainDataSource ) ).json()
			if ( response ) {
					this.$store.commit ( 'setMainData', response )
					let __hash = decodeURI ( location.hash ).slice(1).trim()
					__hash ? this.getQuizData ( __hash ) : null
					return "success"
			} else return 'Error reading the main data file '
		},

		async getQuizData ( theme ) {

				if ( theme ) {
						let ___data = this.$store.state.mainData
												.find ( x => x.folder === theme )
						this.$store.commit ( 'setQuizName', theme )
						await this.$store.dispatch ( 'getQuizData', {
								folder: ___data.folder,
								files: ___data.levels
						})
						this.startQuiz = true
				}
		},

		signOut () {
				this.$store.commit( "setUser", {
					login: "",
					name: "",
					fname: "",
					photoURL: "",
					registered: ""
				})
				this.$store.commit ( "setUserResults", {} )
				this.login = null
		},

		async getCookies () {
        this.login = Object.assign ( {}, ...document.cookie.split ( "; " )
            .map ( item => item.split ( "=" ) )
                .map (
                    item => Object.assign (
                        {}, { [ item[0] ] : item [1] }
                    )
                )
        ).user

				if ( !this.login ) return this.signOut()

				let response = await this.$store.dispatch ( "getUserInfo", this.login )
				if ( response.error ) return this.signOut()

				this.$store.commit ( "setUser", {
						login: this.login,
						name: response.name,
						fname: response.fname,
						photoURL: response.photoURL,
						registered: response.registered
				})

				this.$store.commit ( "setUserResults", response.results )
		},

		windowResized () {
			this.winHeight = window.innerHeight
			this.winWidth = window.innerWidth
    }
	},

	components: {
		'nav-panel': NavigationPanel,
		'app-footer': appFooter,
		'quiz-component': QuizComponent,
		'login-component': LoginComponent,
		'user-info': UserInfo,
		'sign-up-component': SignUpComponent,
		'parallax-back' : Parallax,
		'canvas-element': Canvas
	},

	template: `
	<v-app dark class = "main-content" v-resize="windowResized">
			<parallax-back></parallax-back>

				<v-app-bar app class="dark-glass"
									 v-if="mainMenuReady && !startQuiz && (!sign_up_process) && (!sign_in_process)">

						<!--<img class="center-js"
						     src="https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fjs-icon.svg"
								 @click.stop = "drawer = !drawer">-->

						<div class="center-js" @click = "drawer = !drawer">
						    <canvas-element color="#fa0" width="100" height="90"></canvas-element>
						</div>

						<v-toolbar-title v-if="login">
							<v-avatar v-if="user.photoURL">
								<img :src="user.photoURL">
							</v-avatar>
							{{user.fname + " " + user.name}}
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-menu offset-y>
						  <template v-slot:activator="{ on, attrs }">
								<v-btn icon
								       v-bind="attrs"
	                     v-on="on">
										<v-icon large accent>more_vert</v-icon>
								</v-btn>
							</template>
							<v-list>
										<v-list-item @click = "sign_up_process=true">
										  <v-list-item-content>
												<v-list-item-title>Sign up</v-list-item-title>
										  </v-list-item-content>
										</v-list-item>
										<v-list-item @click = "sign_in_process=true">
										  <v-list-item-content>
												<v-list-item-title>Sign in</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
										<v-list-item @click = "showInfo=true" :disabled="!login">
										  <v-list-item-content>
												<v-list-item-title>Достижения</v-list-item-title>
										  </v-list-item-content>
										</v-list-item>
							</v-list>
						</v-menu>
				</v-app-bar>

				<sign-up-component v-if="sign_up_process"></sign-up-component>
				<login-component v-if="sign_in_process"></login-component>

				<v-footer class="glass" app v-if="showFooter">

					<img src = "./images/personage.gif" width="30" style="position:absolute; bottom:0;">
					<v-spacer></v-spacer>
					<v-tooltip top nudge-top="-15" color="transparent">
					  <template v-slot:activator="{ on }">
						  <span v-on="on" dark transparent>
							  &copy;&nbsp;Irina Fylyppova 2018
						  </span>
						</template>
							<img src="./images/my-photo.jpg" width="100">
					</v-tooltip>
				</v-footer>

				<quiz-component v-if = "quizReady && startQuiz">
				</quiz-component>
		<nav-panel :states = "mainMenuItems"></nav-panel>
		<user-info :showInfo="showInfo"></user-info>
	</v-app>
	`
}).$mount ( '#JS-quiz' )
