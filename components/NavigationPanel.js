'use strict'

const NavigationPanel = {
    props: [ "states" ],
    data: function () {
      return {
        quiz: {}
      }
    },
    computed: {
        localDrawer: {
		        get: function () {
              return this.$root.drawer
		        },
		        set: function ( newValue ) {
              this.$root.$emit ( 'navigation-drawer-state', newValue )
		        }
        }
    },
    template: `
      <v-container class = "transparent">
        <v-navigation-drawer absolute
                class = "transparent"
                app temporary clipped
                width="${window.innerWidth/2}"
                v-model = "localDrawer">
            <v-list class="pa-0 transparent">
                <v-list-tile avatar>
                    <v-list-tile-avatar tile>
                        <img src="./images/js-icon.svg" width="40">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            &nbsp;&nbsp;Quiz
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0 transparent" dense>
                <v-divider></v-divider>
                <v-list-tile class="transparent"
                             v-for = "item in states"
                             :key = "item"
                             @click = "clickHandler ( item )">
                    <v-list-tile-action>
                        <v-icon>assignment</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                              {{ item }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
      </v-container>
    `,
    methods: {
      clickHandler: async function ( val ) {
            this.$root.$emit ( 'closeNavigationPanel' )
            let ___data = this.$root.$store.state.mainData
                        .filter ( x => x.name === val )[0]
            location.hash = ___data.folder
            this.$root.$store.commit ( 'setQuizName', val )
            await this.$root.$store.dispatch ( 'getQuizData', {
                folder: ___data.folder,
                files: ___data.levels
            })
            this.$root.$emit ( 'start-quiz', val )
        }
    },
    components: {

    }
}
export default NavigationPanel
