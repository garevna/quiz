'use strict'

const path = require('path')

import Vue from 'vue'

import Vuetify from 'vuetify'
Vue.use ( Vuetify )
import vuetifyCSS from 'MODULES/vuetify/dist/vuetify.min.css'

import googleFonts from 'CSS/googleFonts.css'

import NavigationPanel from 'JS/NavigationPanel'
import appFooter from 'JS/appFooter'
import QuizComponent from 'JS/QuizComponent'
import LoginComponent from 'JS/loginComponent'
import UserInfo from 'JS/userInfo'

import store from 'JS/DataStore'

import rootCSS from 'CSS/root.css'
import mainCSS from 'CSS/main.css'
import forVuetify from 'CSS/forVuetify.css'

new Vue ( {
	store,
	data: function () {
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
			login: false,
			dialog: false,
			showInfo: false
		}
	},
	computed: {
		user: function () { return this.$store.state.userInfo },
		mainMenuReady: function () { return this.$store.getters.mainMenuReady },
		mainMenuItems: function () { return this.$store.getters.mainMenuItems },
		quizReady: function () { return this.$store.state.quizReady }
	},
	created: function () {
		fetch ( this.mainDataSource )
				.then ( response => response.json()
					.then ( resp =>
						this.$store.commit ( 'getMainData', resp ) )
				)
				.catch ( err => console.log ( 'ОШИБКА ', err ) )
	},
	mounted: function () {
		this.getCookies ()
		this.dialog = false
		this.$on('close-dialog', function (){
			this.dialog = false
		})
		this.$on( 'sign-in', function (){
				this.login = true
				this.dialog = false
		})
		window.addEventListener ( 'resize', this.windowResized )
		this.$on ( 'start-quiz', function ( val ) {
				!this.login ? ( this.dialog = true ) : ( this.startQuiz = true )
		})
		this.$on ( 'exit-quiz', function () {
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
		this.$vuetify.theme = {
				primary: '#36465d',
				secondary: '#4a8272',
				accent: '#9b03a5',
				error: '#d00',
				info: '#09a',
				success: '#266150',
				warning: '#fa0'
		}
		this.windowResized ()
	},
	methods: {
		getCookies: function () {
        let res = document.cookie.split ( "; " ).map ( x =>  {
                var tmp = x.split ( "=" )
                var elem = {}
                elem [ tmp [0] ] = tmp [1]
                return elem
        })
				let __user = Object.assign ( {}, ...res )
				this.login = __user.fname && __user.name
				this.login ?
						this.$store.commit ( "setUser", __user ) : null
		},
		windowResized () {
        this.$emit ( 'win-resize' )
    }
	},
	components: {
		'nav-panel': NavigationPanel,
		'app-footer': appFooter,
		'quiz-component': QuizComponent,
		'login-component': LoginComponent,
		'user-info': UserInfo
	},
	template: `
	<v-app dark class = "main-content">
				<v-toolbar flat class = "primary" app v-if = "!startQuiz">
						<v-btn @click.stop = "drawer = !drawer" dark color = "primary" icon>
								<v-icon>menu</v-icon>
						</v-btn>

						<v-toolbar-title v-if = "login">
							<v-avatar v-if = "user.photoURL">
								<img :src="user.photoURL">
							</v-avatar>
							{{user.fname + " " + user.name}}
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-menu offset-y>
								<v-btn icon slot = "activator">
										<v-icon>more_vert</v-icon>
								</v-btn>
								<v-list>
										<v-list-tile @click = "dialog=true">
												<v-list-tile-title>
														Sign in
												</v-list-tile-title>
										</v-list-tile>
										<v-list-tile @click = "showInfo=true">
												<v-list-tile-title>
														Достижения
												</v-list-tile-title>
										</v-list-tile>
								</v-list>
						</v-menu>
				</v-toolbar>

				<login-component v-if="dialog"></login-component>

				<v-footer class="glass" app>
					<img src = "./images/a-level.png" width="100">
					<v-spacer></v-spacer>
					<v-tooltip bottom nudge-top="-30">
						<span slot="activator">
							&copy;&nbsp;Irina Fylyppova 2017
						</span>
						<span>
							<img src="./images/my-photo.png" width="80">
						</span>
					</v-tooltip>
				</v-footer>

				<quiz-component v-if = "quizReady && startQuiz">
				</quiz-component>
		<nav-panel :states = "mainMenuItems"></nav-panel>
		<user-info :showInfo="showInfo"></user-info>
	</v-app>
	`
}).$mount ( '#JS-quiz' )
