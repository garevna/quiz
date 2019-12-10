export default {

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
}
