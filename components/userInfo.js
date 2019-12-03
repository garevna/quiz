'use strict'

const UserInfo = {
    props: [ "showInfo" ],
    data () {
        return {

	      }
    },
    computed: {
        user () {
            return this.$root.$store.state.userInfo
        },
        resultsHeaders () {
            return Object.keys( this.$root.$store.state.userResults )
        },
        results () {
          return Object.values (
              this.$root.$store.state.userResults
          )
        }
    },
    template: `
       <v-dialog max-width = "400" v-model = "showInfo">
                <v-card v-for = "( item, index ) in resultsHeaders"
                        :key="index"
                        dark>
                    <v-card-title class = "warning--text">
                          {{item}}
                    </v-card-title>
                    <v-card-text v-for = "( attempt, ind ) in results[index]"
                                 :key="ind">
                      <v-icon>star_circle</v-icon>
                      {{attempt}}
                    </v-card-text>
                </v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text dark
                           @click.native = "closeInfo">
                           Close
                    </v-btn>
                </v-card-actions>
        </v-dialog>
    `,
    methods: {
        closeInfo () {
            this.$root.$emit ( 'close-info' )
        }
    }

}

export default UserInfo
