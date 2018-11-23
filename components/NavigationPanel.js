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
        <v-navigation-drawer class = "secondary"
                            app temporary clipped
                            v-model = "localDrawer">
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar tile>
                        <img src="./images/js-ico.png" width="40">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            &nbsp;&nbsp;Quiz
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for = "item in states"
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
            let files = this.$root.$store.state.mainData
                .filter ( x => x.name === val )[0]
                .levels
            this.$root.$store.commit ( 'setQuizName', val )
            await this.$root.$store.dispatch ( 'getQuizData', files )
            this.$root.$emit ( 'start-quiz', val )
        }
    },

}
export default NavigationPanel
