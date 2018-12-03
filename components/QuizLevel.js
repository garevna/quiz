'use strict'

import quizTemplate from 'JS/quizTemplate'
import JSCodeElement from 'JS/JS-code'
import htmlCodeElement from 'JS/html-code'

import jsClasses from 'CSS/js-classes.css'
import htmlClasses from 'CSS/html-classes.css'

const QuizLevel = {
  props: [ "level" ],
  data: function () {
    return {
      selected: [],
      answer: "",
      lives: this.$root.$store.state.quizData.lives,
      score: this.$root.$store.state.quizData.score,
      maxScore: this.$root.$store.state.quizData.maxScore,
      showResults: false,
      levelResults: { right: 0, wrong: 0 }
    }
  },
  components: {
      'quiz-template': quizTemplate,
      'js-code': JSCodeElement,
      'html-code': htmlCodeElement
  },
  computed: {
    quizData () {
      return JSON.parse( JSON.stringify( this.$parent.currentQuiz ) )
    },
    results () {
      return {
          lives: this.$root.$store.state.quizData.lives,
          score: this.$root.$store.state.quizData.score,
          maxScore: this.$root.$store.state.quizData.maxScore
      }
    },
    params () {
          var res = []
          this.quizData.picture ?
                  res.push ({
                      slotName: 'picture',
                      tabIcon:'insert_photo'
                  }) : null
          this.quizData.js ?
                  res.push ({
                      slotName: 'js',
                      tabSymbol: "{...}"
                  }) : null
          this.quizData.html ?
                  res.push ({
                      slotName: 'html',
                      tabIcon:'code'
                  }) : null
          this.quizData.type === 'choice' ?
                  res.push ({
                      slotName: 'choice',
                      tabIcon:'touch_app'
                  }) : null
          this.quizData.type === 'input' ?
                  res.push ({
                      slotName: 'text',
                      tabIcon:'keyboard'
                  }) : null
          this.quizData.type === 'findError' ?
                  res.push ({
                      slotName: 'findError',
                      tabIcon:'developer_board'
                  }) : null
          this.quizData.type === 'finish' ?
                  res.push ({
                      slotName: 'results',
                      tabIcon:'ballot_outline'
                  }) : null
          return res
      }
  },
  methods: {
      coloring ( text, lang ) {
          return `<code data-language="${lang}">${text}</code>`
      },
      minify ( str ) {
          return str.split ( ' ' ).join('')
                 .split ( String.fromCharCode(10) ).join('')
                 .split ( String.fromCharCode(9) ).join('')
                 .split ( String.fromCharCode(13) ).join('')
      },
      findError () {
          var result = this.minify ( this.quizData.wrongContent )
          var etalon = this.minify ( this.quizData.rightContent )
          var tst = result === etalon
          this.levelResults = { right: 0 + tst, wrong: 0 + !tst }
      },
      choice () {
          this.levelResults = { right: 0, wrong: 0 }
          for ( var sel of this.selected ) {
              this.quizData.rightChoicesNums.indexOf ( sel ) < 0 ?
                    this.levelResults.wrong  += 1 :
                    this.levelResults.right  += 1
          }
      },
      input () {
          let x = this.minify ( this.answer ) === this.minify ( this.quizData.rightInput )
          this.levelResults = { right: 0 + x, wrong: 0 + !x }
      },
      finish () {

      },
      validateAnswer () {
          this [ this.quizData.type ] ()
          this.$root.$store.commit ( 'saveQuizResults', {
                score: this.levelResults.right * this.quizData.balls,
                lives: this.levelResults.wrong
          })
          this.lives = this.$root.$store.state.quizData.lives
          this.score = this.$root.$store.state.quizData.score
          this.showResults = true
          this.snackbar = true
          // if ( this.lives === 0 ) this.$parent.$emit ( 'looser' )

      },
      nextLevel () {
          this.answer = ""
          this.selected = []
          this.$parent.$emit ( 'next-level' )
          this.showResults = false
      },
      exitQuiz () {
          this.$root.$emit ( 'exit-quiz' )
      }
  },
  template: `
    <quiz-template :params = "params">
        <div slot = "question" v-if = "quizData.type !== 'finish'">
          <v-chip color="warning" text-color="white">
            <v-avatar class="accent">{{level}}</v-avatar>
            {{ quizData.question }}
          </v-chip>
        </div>

        <v-card-text slot = "choice" class = "codeSection">
            <v-checkbox
                 v-for = "( ch, ind ) in quizData.choiceVariants"
                        :key = "ind"
                        :label = "ch"
                        :value = "ind"
                        hide-details
                        v-model = "selected">
            </v-checkbox>
        </v-card-text>

        <v-card-media slot = "picture" v-if = "quizData.picture"
                      :src = "quizData.picture"
                      :height = "${window.innerHeight*0.7}">
        </v-card-media>

        <v-card-text slot = "text" class = "codeSection"
                     v-if = "quizData.type === 'input'">
            <v-text-field :suffix = "quizData.inputLegend ?
                                     quizData.inputLegend.after : ''"
                          :prefix = "quizData.inputLegend ?
                                     quizData.inputLegend.before : ''"
                          box
                          v-model = "answer"
                          style = "max-width:fit-content;">
            </v-text-field>
        </v-card-text>

        <v-card-text slot = "html" class = "codeSection"
                     v-if = "quizData.html">
            <html-code :text = "quizData.html">
            </html-code>
        </v-card-text>

        <v-card slot = "js" class = "codeSection"
                v-if = "quizData.js">
              <js-code :text = "quizData.js">
              </js-code>
        </v-card>

        <v-card-text slot = "findError"
                     v-if = "quizData.type === 'findError'">
              <v-text-field name = "wrongContent"
                            class = "codeSection"
                            hide-details solo
                            row-height = "18"
                            multi-line
                            rows = 25
                            auto-grow
                            v-model = "quizData.wrongContent">
              </v-text-field>
        </v-card-text>

        <v-card-text slot = "results"
                     v-if = "quizData.type === 'finish'">
            <!--<v-card>-->
              <v-container fluid grid-list-lg>
                  <v-avatar size = "100px">
                    <img :src = "quizData.results.userPhoto">
                  </v-avatar>
                  <h3>{{quizData.results.userName}}</h3>
              </v-container>
            <hr/>
              <v-container fluid grid-list-lg>
                  <h4 class = "white--text text--shadow">
                      <v-icon x-large class = "warning--text">
                        assessment
                      </v-icon>
                      Набрано очков {{ quizData.results.score }}
                  </h4>
                  <h4 class = "white--text text--shadow">
                      <v-icon x-large class= "white--text">
                            stars
                      </v-icon>
                      из {{ quizData.results.maxScore }} возможных
                  </h4>
                  <h4 class = "white--text text--shadow">
                      <v-icon x-large>
                          battery_charging_full
                      </v-icon> Осталось жизней {{ quizData.results.lives }}
                  </h4>
              </v-container>
            <!--</v-card>-->
        </v-card-text>
      </quiz-template>
  `
}
export default QuizLevel
