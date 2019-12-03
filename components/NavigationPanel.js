'use strict'

const NavigationPanel = {
    props: [ "states" ],
    data: function () {
      return {
        quiz: {}
      }
    },
    computed: {
        width: {
          get: function () {
            return Math.max ( window.innerWidth/2, 300 )
          }
        },
        height: {
          get: function () {
            return window.innerHeight - 100
          }
        },
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
      <v-container class="transparent">
        <v-navigation-drawer app
                             bottom
                             absolute
                             temporary
                             class="transparent"
                             :width="width"
                             v-model = "localDrawer">
            <!--<v-list class="pa-0 transparent">-->
                <v-list-item>
                    <v-list-item-avatar tile>
                        <img src="./images/js-icon.svg" width="40">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            &nbsp;&nbsp;Quiz
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            <!--</v-list>-->

            <!--<v-list class="pt-0 transparent" dense>-->
                <v-divider></v-divider>
                <v-list-item class="transparent"
                             v-for = "item in states"
                             :key = "item"
                             @click = "clickHandler ( item )">
                    <v-list-item-action>
                        <v-icon>assignment</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                              {{ item }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            <!--</v-list>-->
        </v-navigation-drawer>
      </v-container>
    `,
    methods: {

      clickHandler: async function ( val ) {
        console.log ( val, this.$root.$store.state.mainData )
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
