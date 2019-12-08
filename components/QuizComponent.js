'use strict'

import styles from 'CSS/quiz.css'

import QuizLevel from 'JS/QuizLevel'

const QuizComponent = {
    props: [ ],
    data: function () {
        return {
            level: 1,
            showQuize: true,
            showResults: false,
            status: 'work',
            finish: null
        }
    },
    computed: {
        score () {
          this.$root.$store.state.quizData.score
        },
        lives () {
          return this.$root.$store.state.quizData.lives
        },
        quizData () {
          return this.$root.$store.state.quizData
        },
        startQuiz () {
          return this.$root.startQuiz
        },
        quizReady () {
          return this.$root.$store.state.quizReady
        },
        currentQuiz () {
            return this.quizData.levels [ this.level - 1 ]
        },
        maxScore () {
            return this.$root.$store.state.quizData.maxScore
        },
        results () {
            return {
                maxScore: this.$root.$store.state.quizData.maxScore,
                score: this.$root.$store.state.quizData.score,
                lives: this.$root.$store.state.quizData.lives
            }
        },
    },
    template: `
      <div v-if = "showQuize">
        <quiz-level :quizData = "currentQuiz"
                      :level = "level"
                      v-if = "startQuiz">
        </quiz-level>
    </div>
    `,
    components: {
        'quiz-level': QuizLevel
    },
    methods: {

        finishCallback () {
            this.level = this.quizData.levels.length + 1
            this.$root.$store.commit ( `saveAttemptResult` )
            this.$root.$store.commit ( 'pushLevelData', {
                results: {
                    userPhoto: this.$root.$store.state.userInfo.photoURL ||
                            `https://www.shareicon.net/data/2015/12/14/2078${10 + Math.round ( Math.random () * 10 )}_face_300x300.png`,
                    userName: `${this.$root.$store.state.userInfo.fname} ${this.$root.$store.state.userInfo.name}`,
                    score: this.results.score,
                    lives: Math.max ( this.lives, 0 ),
                    maxScore: this.results.maxScore
                },
                type: "finish",
                fone: this.lives <= 0 ? "failureSlide" :
                         this.results.score === this.results.maxScore ?
                                           "successSlide" : "finishSlide"
            })
            this.$root.$store.dispatch ( "saveResults" )
        }
    },

    mounted: function () {
        this.$on ( 'save-quiz-level-results', function ( results ) {
            this.$root.$store.commit ( 'saveQuizResults', results )
        })
        this.$on ( 'next-level', function () {
            this.level += 1
            this.showResults = false
            this.lives <= 0 || this.level > this.quizData.levels.length ?
                    this.finishCallback() : null
        })
        this.$root.$on ( 'exit-quiz', function () {
            this.showQuize = false
        })
    }
}

export default QuizComponent
