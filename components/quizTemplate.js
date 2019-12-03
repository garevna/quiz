'use strict'

// import CubeComponent from 'JS/cube'
// import Canvas from 'JS/CanvasComponent'

const quizTemplate = {
    props: [ "params" ],
    data: function () {
      return {
        dialog: true,
        activeTab: null,
        snackbar: false,
        showCube: true,
        spacing: "px-xs-2 px-sm-4 px-md-6 px-lg-8 px-xl-10 mx-xs-0 mx-sm-4 mx-md-6 mx-lg-12",
        mainHeight: 0,
        maxWidth: 900,
        question: null,
        controls: null,
      }
    },
    watch: {
      params: function ( newVal, oldVal ) {
        this.activeTab = "0"
      }
    },
    methods: {
      answerIsReady: function () {
        this.$parent.validateAnswer ()
        this.snackbar = true
      },
      nextLevel: function () {
        this.snackbar = false
        this.$parent.nextLevel ()
      },
      resizeWin () {
        this.mainHeight = this.question && this.controls ?
            window.innerHeight - this.question.offsetHeight - this.controls.offsetHeight - 96 :
            window.innerHeight * 0.7
      },
    },
    components: {
        // 'canvas-element': Canvas
    },
    mounted: function () {
        this.question = document.getElementById ( "question" )
        this.controls = document.getElementById ( "controls" )
        this.resizeWin ()
    },
    template: `
    <v-container text-xs-center
                 fluid
                 class="dark-glass">
          <v-card id="question" :max-width="maxWidth" class="mx-auto dark-glass">
            <slot name="question"></slot>
          </v-card>

          <v-container fluid class="transparent">

              <v-card fluid :max-width="maxWidth"
                            :height="mainHeight"
                            v-resize="resizeWin"
                            class="mx-auto dark-glass"
                            style="overflow-y: auto">

                    <v-tabs v-model="activeTab" slider-color="warning" dark class="dark-glass">

                        <v-tab  v-for="( item, index ) in params" :key="index" ripple>
                            <span v-if='item.tabSymbol'>{{ item.tabSymbol }}</span>
                            <v-icon v-if='item.tabIcon'>{{ item.tabIcon }}</v-icon>
                        </v-tab>

                        <v-tab-item v-for="( item, index ) in params" :key="index">
                            <v-card dark text transparent>
                                <slot :name="item.slotName"></slot>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
              </v-card>

              <!--<canvas-element></canvas-element>-->

          </v-container>

          <v-card id="controls" :max-width="maxWidth" dark elevation=0 class="transparent mx-auto dark-glass">
              <v-row>
                <v-col cols="auto">
                  <v-card class="py-1 px-2">
                    <v-badge color="success">
                      <span slot = "badge">{{ $parent.lives }}</span>
                        <v-icon color = "warning">
                            battery_charging_full
                        </v-icon>
                    </v-badge>
                  </v-card>
                </v-col>

                <v-col cols="auto">
                  <v-card class="py-1 px-2">
                    <v-badge color = "success">
                        <span slot = "badge">{{ $parent.score }}</span>
                        <span> {{ $parent.$parent.maxScore }} </span>
                    </v-badge>
                  </v-card>
                </v-col>

                <v-spacer></v-spacer>

                <v-col cols="auto">
                  <v-card>
                    <v-tooltip top
                               v-if = "!$parent.showResults && $parent.quizData.type !== 'finish'"
                               color="transparent">
                      <template v-slot:activator="{ on }">
                        <v-btn icon @click = "answerIsReady"
                                    v-on= "on">
                            <v-icon>send</v-icon>
                        </v-btn>
                      </template>
                      <span>Check result</span>
                    </v-tooltip>
                  </v-card>
                </v-col>

                <v-col cols="auto">
                  <v-card>
                    <v-tooltip top
                               v-if = "$parent.quizData.type !== 'finish'"
                               color="transparent">
                      <template v-slot:activator="{ on }">
                        <v-btn icon @click = "nextLevel"
                                    v-on="on">
                            <v-icon>forward</v-icon>
                        </v-btn>
                      </template>
                      <span>Next</span>
                    </v-tooltip>
                  </v-card>
                </v-col>

                <v-col cols="auto">
                  <v-card>
                    <v-tooltip top color="transparent">
                      <template v-slot:activator="{ on }">
                        <v-btn icon @click = "$parent.exitQuiz"
                                    v-on="on">
                            <v-icon>exit_to_app</v-icon>
                        </v-btn>
                      </template>
                      <span>Exit</span>
                    </v-tooltip>
                  </v-card>
                </v-col>
            </v-row>
          </v-card>

          <slot name="snackbar"></slot>

          <v-snackbar slot="snackbar"
                      :timeout="5000"
                      left top
                      multi-line
                      vertical
                      color="#333"
                      v-if = "snackbar"
                      v-model = "snackbar">
              <v-row>
                <v-col cols="auto">
                  <v-badge xs1 color="success">
                        <span slot = "badge">{{ $parent.levelResults.right }}</span>
                        <v-icon color = "warning">
                            thumb_up
                        </v-icon>
                  </v-badge>
                </v-col>
                <v-col cols="auto">
                  <v-badge xs1 color="error">
                    <span slot = "badge">{{ $parent.levelResults.wrong }}</span>
                    <v-icon color = "warning">
                        thumb_down
                    </v-icon>
                  </v-badge>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                  <v-btn  text icon color="warning"
                          @click.native = "snackbar = false">
                      <v-icon>close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
          </v-snackbar>
    </v-container>
    `
}

export default quizTemplate
