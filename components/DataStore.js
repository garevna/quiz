'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use ( Vuex )

const quizStore = new Vuex.Store ({
  state: {
      quizName: null,
      quizReady: false,
      mainData: null,
      mainDataIsReady: false,
      quizData: {
        score: 0,
        maxScore: 0,
        levels: []
      },
      quizRawData: null,
      gameOverPictureURL: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSZVhfeXVPblhxNzA",
      successPictureURL: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSd3U0S09YUkkwanc",
      failurePictureURL: "https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSMzNOUGc3QndEOGM",
      userInfo: {
          fname: "",
          name: "",
          photoURL: ""
      },
      userResults: {}
  },
  getters: {
    quizLevelData: state => {
        let quiz = {
            balls: state.quizRawData.split ( /[\s]*____quizBalls____[\s]*/ )[1],
            type: state.quizRawData.split ( /[\s]*____quizType____[\s]*/ )[1],
            question: state.quizRawData.split ( /[\s]*____quizQuestion____[\s]*/ )[1],
            picture: state.quizRawData.split ( /[\s]*____quizPicture____[\s]*/ )[1],
            js: state.quizRawData.split ( /[\s]*____quizJS____[\s]*/ )[1],
            html: state.quizRawData.split ( /[\s]*____quizHTML____[\s]*/ )[1],
            rightInput: state.quizRawData.split ( /[\s]*____rightInput____[\s]*/ )[1],
            inputLegendBefore: state.quizRawData.split ( /[\s]*____inputLegendBefore____[\s]*/ )[1] || "",
            inputLegendAfter: state.quizRawData.split ( /[\s]*____inputLegendAfter____[\s]*/ )[1] || "",
            choiceVariants: state.quizRawData.split ( /[\s]*____choiceVariants____[\s]*/ )[1],
            rightChoicesNums: state.quizRawData.split ( /[\s]*____rightChoice____[\s]*/ )[1],
            wrongContent: state.quizRawData.split ( /[\s]*____wrongContent____[\s]*/ )[1],
            rightContent: state.quizRawData.split ( /[\s]*____rightContent____[\s]*/ )[1]
        }

        quiz.balls = Number ( quiz.balls ? quiz.balls.split( /[\s]*____/ )[0] : 5 )

        quiz.type = quiz.type.split( /[\s]*____/ )[0]

        quiz.picture = quiz.picture ? quiz.picture.split( /[\s]*____/ )[0] : null

        quiz.js = quiz.js ? quiz.js.split( /[\s]*____/ )[0] : null

        quiz.html = quiz.html ? quiz.html.split( /[\s]*____/ )[0] : null

        quiz.question = quiz.question.split( /[\s]*____/ )[0]

        quiz.type === "choice" ? quizTypeChoice ( state.quizRawData ) :
            quiz.type === "input" ? quizTypeInput ( state.quizRawData ) :
                quizTypeFindError ( state.quizRawData )

        function quizTypeInput () {
            quiz.rightInput = quiz.rightInput.split( /[\s]*____/ )[0]
            quiz.inputLegendBefore = quiz.inputLegendBefore.split( /[\s]*____/ )[0]
            quiz.inputLegendAfter = quiz.inputLegendAfter.split( /[\s]*____/ )[0]
        }
        function quizTypeChoice () {
            quiz.choiceVariants = quiz.choiceVariants
                .split( /[\s]*____/ )[0].split( String.fromCharCode( 10 ) )
                .map ( x => x.trim()
                    .split( String.fromCharCode(10) ).join("")
                    .split( String.fromCharCode(13) ).join("")
                )
            quiz.rightChoicesNums = quiz.rightChoicesNums
                .split( /[\s]*____/ )[0].split(",")
                .map ( x => Number ( x.trim()
                      .split ( String.fromCharCode(10) ).join("")
                      .split( String.fromCharCode(13) ).join("")
                   )
                )
        }
        function quizTypeFindError () {
            quiz.wrongContent = quiz.wrongContent.split( /[\s]*____/ )[0]
            quiz.rightContent = quiz.rightContent.split( /[\s]*____/ )[0]
        }
        return quiz
    },
    dataIsReady:  state => state.mainDataIsReady,
    mainMenuReady: state => state.mainDataIsReady,
    mainMenuItems: state =>
          state.mainDataIsReady ?
          state.mainData.map ( item => item.name ) : []
  },
  mutations: {
    setQuizName: ( state, name ) => state.quizName = name,
    initQuizData: state => {
      state.quizData = {
          gameOverPictureURL: state.gameOverPictureURL,
          successPictureURL: state.successPictureURL,
          failurePictureURL: state.failurePictureURL,
          score: 0,
          maxScore: 0,
          lives: 10,
          levels: []
      }
    },
    getRawData: ( state, text ) => state.quizRawData = text,
    pushLevelData: ( state, levelData ) => {
         state.quizData.levels.push ( levelData )
    },
    buildQuiz: state => {
        state.quizData.maxScore = 0
        for ( var level of state.quizData.levels ) {
            state.quizData.maxScore += level.balls * (
              level.rightChoicesNums ?
                  level.rightChoicesNums.length : 1
            )
        }
        state.quizReady = true
    },
    saveQuizResults: ( state, params ) => {
        state.quizData.score += params.score
        state.quizData.lives -= params.lives
    },
    getMainData: ( state, mainData ) => {
        state.mainData = mainData
        state.mainDataIsReady = true
        state.mainMenuOptions = mainData.map ( item => item.name )
    },
    setUser: ( state, userInfo ) => {
        state.userInfo = userInfo
        let user = `${state.userInfo.fname} ${state.userInfo.name}`
        if ( user ) {
          let res = localStorage.getItem ( user )
          state.userResults = res ? JSON.parse ( res ) : {}
        }
		},
    setCookie: state => {
        for ( var prop in state.userInfo ) {
            document.cookie = `${prop}=${state.userInfo[prop]}`
        }
    },
    saveAttemptResult: state => {
        !state.userResults [ state.quizName ] ?
            state.userResults [ state.quizName ] = [] : null
        state.userResults [ state.quizName ].push (
              Math.round ( state.quizData.score * 100 / state.quizData.maxScore ) + "%"
            )
        localStorage.setItem (
            `${state.userInfo.fname} ${state.userInfo.name}`,
            JSON.stringify ( state.userResults )
        )
    }
  },
  actions: {
      getQuizData ( context, params ) {
          context.state.quizReady = false
          context.commit ( 'initQuizData' )
          params.files.forEach (
              file => {
                  fetch ( `data/quiz/${params.folder}/${file}.md` )
                      .then (
                          result => result.text()
                              .then ( text => {
                                  context.commit ( 'getRawData', text )
                                  context.commit ( 'pushLevelData', context.getters.quizLevelData )
                                  context.commit ( 'buildQuiz' )
                              })
                      )
                      .catch ( err => console.warn ( `There is no such file: data/quiz/${params.folder}/${file}.md` ) )
              }
          )
      }
  }
})

export default quizStore
