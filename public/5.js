(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./components/DataStore.js":
/*!*********************************!*\
  !*** ./components/DataStore.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n // import Vue from 'vue'\n\nconst Vue = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.common.js\"); // import Vuex from 'vuex'\n\n\nconst Vuex = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\nVue.use(Vuex);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Vuex.Store({\n  state: {\n    quizName: null,\n    quizReady: false,\n    mainData: null,\n    mainDataIsReady: false,\n    quizData: {\n      score: 0,\n      maxScore: 0,\n      levels: []\n    },\n    quizRawData: null,\n    backgroundPictures: [402, 702, 516, 404, 405, 406, 705, 408, 509, 440, 410, 448, 704, 417, 147, 316],\n    gameOverPictureURL: \"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSZVhfeXVPblhxNzA\",\n    successPictureURL: \"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSd3U0S09YUkkwanc\",\n    failurePictureURL: \"https://drive.google.com/uc?export=download&id=0BxaMB69y7fvSMzNOUGc3QndEOGM\",\n    userInfo: {\n      login: \"\",\n      fname: \"\",\n      name: \"\",\n      registered: \"\",\n      passHash: \"\",\n      photoURL: \"\"\n    },\n    userResults: {}\n  },\n  getters: {\n    quizLevelData: state => {\n      let quiz = {\n        balls: state.quizRawData.split(/[\\s]*____quizBalls____[\\s]*/)[1],\n        type: state.quizRawData.split(/[\\s]*____quizType____[\\s]*/)[1],\n        question: state.quizRawData.split(/[\\s]*____quizQuestion____[\\s]*/)[1],\n        picture: state.quizRawData.split(/[\\s]*____quizPicture____[\\s]*/)[1],\n        js: state.quizRawData.split(/[\\s]*____quizJS____[\\s]*/)[1],\n        html: state.quizRawData.split(/[\\s]*____quizHTML____[\\s]*/)[1],\n        rightInput: state.quizRawData.split(/[\\s]*____rightInput____[\\s]*/)[1],\n        inputLegendBefore: state.quizRawData.split(/[\\s]*____inputLegendBefore____[\\s]*/)[1] || \"\",\n        inputLegendAfter: state.quizRawData.split(/[\\s]*____inputLegendAfter____[\\s]*/)[1] || \"\",\n        choiceVariants: state.quizRawData.split(/[\\s]*____choiceVariants____[\\s]*/)[1],\n        rightChoicesNums: state.quizRawData.split(/[\\s]*____rightChoice____[\\s]*/)[1],\n        wrongContent: state.quizRawData.split(/[\\s]*____wrongContent____[\\s]*/)[1],\n        rightContent: state.quizRawData.split(/[\\s]*____rightContent____[\\s]*/)[1]\n      };\n      quiz.balls = Number(quiz.balls ? quiz.balls.split(/[\\s]*____/)[0] : 5);\n      quiz.type = quiz.type.split(/[\\s]*____/)[0];\n      quiz.picture = quiz.picture ? quiz.picture.split(/[\\s]*____/)[0] : null;\n      quiz.js = quiz.js ? quiz.js.split(/[\\s]*____/)[0] : null;\n      quiz.html = quiz.html ? quiz.html.split(/[\\s]*____/)[0] : null;\n      quiz.question = quiz.question.split(/[\\s]*____/)[0];\n      quiz.type === \"choice\" ? quizTypeChoice(state.quizRawData) : quiz.type === \"input\" ? quizTypeInput(state.quizRawData) : quizTypeFindError(state.quizRawData);\n\n      function quizTypeInput() {\n        quiz.rightInput = quiz.rightInput.split(/[\\s]*____/)[0].split(String.fromCharCode(10)).filter(x => x.length > 0);\n        quiz.inputLegendBefore = quiz.inputLegendBefore.split(/[\\s]*____/)[0];\n        quiz.inputLegendAfter = quiz.inputLegendAfter.split(/[\\s]*____/)[0];\n      }\n\n      function quizTypeChoice() {\n        quiz.choiceVariants = quiz.choiceVariants.split(/[\\s]*____/)[0].split(String.fromCharCode(10)).map(x => x.trim().split(String.fromCharCode(10)).join(\"\").split(String.fromCharCode(13)).join(\"\"));\n        quiz.rightChoicesNums = quiz.rightChoicesNums.split(/[\\s]*____/)[0].split(\",\").map(x => Number(x.trim().split(String.fromCharCode(10)).join(\"\").split(String.fromCharCode(13)).join(\"\")));\n      }\n\n      function quizTypeFindError() {\n        quiz.wrongContent = quiz.wrongContent.split(/[\\s]*____/)[0];\n        quiz.rightContent = quiz.rightContent.split(/[\\s]*____/)[0];\n      }\n\n      return quiz;\n    },\n    dataIsReady: state => state.mainDataIsReady,\n    mainMenuReady: state => state.mainDataIsReady,\n    mainMenuItems: state => state.mainDataIsReady ? state.mainData.map(item => item.name) : []\n  },\n  mutations: {\n    setQuizName: (state, name) => state.quizName = name,\n    initQuizData: state => {\n      state.quizData = {\n        gameOverPictureURL: state.gameOverPictureURL,\n        successPictureURL: state.successPictureURL,\n        failurePictureURL: state.failurePictureURL,\n        score: 0,\n        maxScore: 0,\n        lives: 10,\n        levels: []\n      };\n    },\n    getRawData: (state, text) => state.quizRawData = text,\n    pushLevelData: (state, levelData) => {\n      state.quizData.levels.push(levelData);\n    },\n    buildQuiz: state => {\n      state.quizData.maxScore = 0;\n\n      for (var level of state.quizData.levels) {\n        state.quizData.maxScore += level.balls * (level.rightChoicesNums ? level.rightChoicesNums.length : 1);\n      }\n\n      state.quizReady = true;\n    },\n    saveQuizResults: (state, params) => {\n      state.quizData.score += params.score;\n      state.quizData.lives -= params.lives;\n    },\n    setMainData: (state, mainData) => {\n      state.mainData = mainData;\n      state.mainDataIsReady = true;\n      state.mainMenuOptions = mainData.map(item => item.name);\n    },\n    setUser: (state, userData) => state.userInfo = JSON.parse(JSON.stringify(userData)),\n    setUserResults: (state, results) => state.userResults = results,\n    setCookie: state => {\n      document.cookie = `user=${state.userInfo.login}`;\n      document.cookie = `pass=${state.userInfo.passHash}`;\n    },\n    saveAttemptResult: state => {\n      !state.userResults[state.quizName] ? state.userResults[state.quizName] = [] : null;\n      state.userResults[state.quizName].push(Math.round(state.quizData.score * 100 / state.quizData.maxScore) + \"%\");\n      localStorage.setItem(`${state.userInfo.fname} ${state.userInfo.name}`, JSON.stringify(state.userResults));\n    }\n  },\n  actions: {\n    async getUserInfo(context, login) {\n      let error = null;\n      let response = await fetch(`https://garevna-js-quiz.glitch.me/forms/${login}`);\n\n      if (response.headers.get(\"Content-Type\").indexOf(\"application/json\") === 0) {\n        return {\n          error: `User ${login} was not found`\n        };\n      }\n\n      let formData = await response.formData();\n      return {\n        name: formData.get(\"name\"),\n        fname: formData.get(\"lastName\"),\n        passHash: formData.get(\"passHash\"),\n        photoURL: URL.createObjectURL(formData.get(\"avatar\")),\n        registered: formData.get(\"registered\"),\n        results: JSON.parse(formData.get(\"results\"))\n      };\n    },\n\n    getQuizData(context, params) {\n      context.state.quizReady = false;\n      context.commit('initQuizData');\n      params.files.forEach(async file => {\n        let text = await (await fetch(`data/quiz/${params.folder}/${file}.md`).catch(err => console.warn(`There is no such file: data/quiz/${params.folder}/${file}.md`))).text();\n        context.commit('getRawData', text);\n        context.commit('pushLevelData', context.getters.quizLevelData);\n        context.commit('buildQuiz');\n      });\n    },\n\n    saveResults(context, results) {\n      let formData = new FormData();\n      formData.set(\"results\", JSON.stringify(context.state.userResults));\n      fetch(`https://garevna-js-quiz.glitch.me/form/${context.state.userInfo.login}`, {\n        method: \"PATCH\",\n        body: formData\n      }).then(response => console.log(\"Results updated: \", response.ok));\n    }\n\n  }\n}));\n\n//# sourceURL=webpack:///./components/DataStore.js?");

/***/ })

}]);