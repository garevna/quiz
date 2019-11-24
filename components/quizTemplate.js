'use strict'

// import CubeComponent from 'JS/cube'
import Canvas from 'JS/CanvasComponent'

const quizTemplate = {
    props: [ "params" ],
    data: function () {
      return {
        activeTab: null,
        snackbar: false,
        showCube: true
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
      onResize () {
        this.showCube = window.innerWidth > 460 && window.innerHeight > 500
        this.activeTab = "1"
      }
    },
    components: {
        // 'cube-element': CubeComponent,
        'canvas-element': Canvas
    },
    mounted: function () {
      this.onResize()
    },
    template: `
      <v-container grid-list-sm mx-auto pb-5
                   class = "quiz-container transparent">
        <v-flex d-flex xs12 mx-auto>
          <v-card flat class="transparent" color="white--text">
            <slot name = "question"></slot>
          </v-card>
        </v-flex>
        <v-card color = "warning--text"
                height = "90%" style = "overflow:auto">
          <canvas-element text="JS"></canvas-element>
          <v-tabs v-model = "activeTab"
                  slider-color="warning">

            <v-tab  v-for="( item, index ) in params"
                    :key="index"
                    ripple>
              <span v-if = 'item.tabSymbol'>
                {{ item.tabSymbol }}
              </span>
              <v-icon v-if = 'item.tabIcon'>
                {{ item.tabIcon }}
              </v-icon>
            </v-tab>

            <!-- <v-tab ripple v-resize="onResize" v-show='showCube' key="10">
                <span><i class="material-icons">insert_emoticon</i></span>
            </v-tab> -->

            <v-tab-item v-for="( item, index ) in params"
                        :key="index">
              <v-card flat transparent>
                  <slot :name="item.slotName"></slot>
              </v-card>
            </v-tab-item>

            <!--<v-tab-item key="10">
              <v-card class="ma-12 pa-12" height="70vh">
                  <cube-element
                      front="./images/front.gif"
                      back="./images/js-cube.png"
                      left="./images/left.gif"
                      right="./images/right.gif"
                      bottom="./images/bottom.gif"
                      top="./images/top.gif"
                      place="150, 150"
                      dimension="200,200">
                  </cube-element>
              </v-card>
            </v-tab-item> -->

          </v-tabs>
        </v-card>

        <v-layout row wrap justify-center>
          <v-flex d-flex xs12 mx-auto>
            <v-card>
              <v-layout flex wrap row justify-space-between>
              <v-flex xs6 sm4>
                <v-badge color = "success">
                  <span slot = "badge">{{ $parent.lives }}</span>
                    <v-icon color = "warning">
                        battery_charging_full
                    </v-icon>
                </v-badge>
                <v-badge color = "success">
                    <span slot = "badge">{{ $parent.score }}</span>
                    <span> {{ $parent.$parent.maxScore }} </span>
                </v-badge>
              </v-flex>
              <v-spacer></v-spacer>
              <v-tooltip top v-if = "!$parent.showResults && $parent.quizData.type !== 'finish'">
                  <v-btn icon @click = "answerIsReady"
                              slot = "activator">
                      <v-icon>send</v-icon>
                  </v-btn>
                  <span>Готово</span>
              </v-tooltip>
              <v-tooltip top v-if = "$parent.quizData.type !== 'finish'">
                  <v-btn icon @click = "nextLevel"
                              slot = "activator">
                      <v-icon>forward</v-icon>
                  </v-btn>
                  <span>Дальше</span>
              </v-tooltip>
              <v-tooltip top>
                  <v-btn icon @click = "$parent.exitQuiz"
                              slot = "activator">
                      <v-icon>exit_to_app</v-icon>
                  </v-btn>
                  <span>Выход</span>
              </v-tooltip>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <slot name = "snackbar"></slot>

        <v-snackbar slot = "snackbar"
                    :timeout = "50000"
                    auto-height
                    left
                    top
                    multi-line
                    vertical
                    color = "secondary"
                    v-if = "snackbar"
                    v-model = "snackbar">
            <v-badge xs1 color = "success" style = "width:22px;">
                  <span slot = "badge">{{ $parent.levelResults.right }}</span>
                  <v-icon color = "warning">
                      thumb_up
                  </v-icon>
            </v-badge>
            <v-badge xs1 color = "error" style = "width:22px;">
                  <span slot = "badge">{{ $parent.levelResults.wrong }}</span>
                  <v-icon color = "warning">
                      thumb_down
                  </v-icon>
              </v-badge>
            <v-btn  flat icon color = "warning"
                    @click.native = "snackbar = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
      </v-container>
    `
}

export default quizTemplate
