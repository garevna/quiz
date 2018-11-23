'use strict'

const LoginComponent = ( 'login-component', {
	data: function () {
		return {
				fname: this.$root.$store.state.userInfo.fname,
				name: this.$root.$store.state.userInfo.name,
				photoURL: this.$root.$store.state.userInfo.photoURL,
				nameRules: [
						v => !!v || 'Обязательное поле',
						v => (v && (/[А-Я, а-я]*/.test(v)) && v.length <= 20) || 'Не более 20 символов кириллицы'
						// v => /[А-Я, а-я]*/.test(v) || 'Кириллицей, пожалуйста'
				],
				urlRules: [
			      v => ( v && /^https{0,1}:\/\/[\w]+\.[\w]{2,3}/.test(v) ) || 'Некорректный URL'
		    ],
		}
	},
	computed: {

	},
	template: `
	<v-container grid-list-lg class="transparent" style="max-width: 500px;">
				<v-card>
					<v-card-title>
						<span class="headline">Регистрация</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field label="Фамилия"
																required
																v-model="fname"
																:rules = "nameRules">
									</v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Имя"
																required
																v-model="name"
																:rules = "nameRules">
									</v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="URL фото"
																v-model= "photoURL"
																:rules = "urlRules"
									>
									</v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="white" flat @click="closeDialog">Close</v-btn>
						<v-btn color="yellow" flat @click="saveNewUser">Save</v-btn>
					</v-card-actions>
				</v-card>
	</v-container>
	`,
	methods: {
		closeDialog: function () {
			this.$root.$emit( 'close-dialog' )
		},
		saveNewUser: function () {
				this.$root.$store.commit ( 'setUser', {
					fname: this.fname,
					name: this.name,
					photoURL: this.photoURL,
					attempts: 0
				})
				this.$root.$store.commit ( "setCookie" )
				this.$root.$emit( 'sign-in' )
		}
	},
	mounted: function () {

	}
})

export default LoginComponent
