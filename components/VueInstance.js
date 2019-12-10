const path = require('path')

const Vue = require ( 'vue' )

import vuetify from '../plugins/vuetify'
Vue.use ( vuetify )

// const store = require ( './DataStore.js' )

// import rootStyles from 'CSS/root.css'
// import mainStyles from 'CSS/main.css'
// import forVuetifyStyles from 'CSS/forVuetify.css'
// import fonts from 'CSS/googleFonts.css'

import 'CSS/root.css'
import 'CSS/main.css'
import 'CSS/forVuetify.css'
import 'CSS/googleFonts.css'

let Parallax, Canvas, NavigationPanel, appFooter, QuizComponent, SignUpComponent, LoginComponent, UserInfo


async function loadComponents () {

		const store = ( await import ( /* webpackChunkName: "store" */ './DataStore.js' ) ).default;
		console.log ( store );

		[ Parallax, Canvas, NavigationPanel, appFooter, QuizComponent, SignUpComponent, LoginComponent, UserInfo ] =
		    ( await Promise.all ([
						import ( /* webpackChunkName: "parallax" */ './parallax.js' ),
						import ( /* webpackChunkName: "canvas" */ './CanvasComponent.js' ),
						import ( /* webpackChunkName: "navigation" */ './NavigationPanel.js' ),
						import ( /* webpackChunkName: "footer" */ './appFooter.js' ),
						import ( /* webpackChunkName: "quiz" */ './QuizComponent.js' ),
						import ( /* webpackChunkName: "registration" */ './registration.js' ),
						import ( /* webpackChunkName: "login" */ './loginComponent.js' ),
						import ( /* webpackChunkName: "results" */ './userInfo.js' )
		    ])).map ( item => item.default )


		const Markup = ( await import ( /* webpackChunkName: "root_template" */ __dirname + '/root_template.js' ) ).default
		const Root = ( await import ( /* webpackChunkName: "root" */ __dirname + '/root.js' ) ).default

		new Vue ({
			store,
			vuetify,
			template: Markup.template,
			data: Root.data,
			computed: Root.computed,
			methods: Root.methods,
			mounted: Root.mounted,
			components: {
					'nav-panel': NavigationPanel,
					'app-footer': appFooter,
					'quiz-component': QuizComponent,
					'sign-up-component': SignUpComponent,
					'login-component': LoginComponent,
					'user-info': UserInfo,
					'parallax-back' : Parallax,
					'canvas-element': Canvas
			},
		}).$mount ( '#JS-quiz' )

		return "Application is ready now!"
}

loadComponents ().then (
		response => console.log ( response ),
		error => console.warn ( error )
)
