(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./components/JS-code.js":
/*!*******************************!*\
  !*** ./components/JS-code.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nconst JSCodeElement = {\n  props: [\"text\", \"contenteditable\"],\n  data: function () {\n    return {\n      classes: [\"this\", \"function\", \"let \", \"var \", \"const \", \"new \", \"if \", \"for \", \"return\", \"null\", \"NaN\", \"undefined\", \"false\", \"true\", \"Infinity\", \"Object\", \"Number\", \"Array\", \"Buffer\", \"Blob\", \"Boolean\", \"String\", \"Date\", \"Error\", \"Symbol\", \"prototype\", \"__proto__\", \"window\", \"document\", \"console\", \"localStorage\", \"cookie\", \"history\", \"fetch\", \"XMLHttpRequest\", \"File\", \"Promise\", \"yield\", \"async\", \"await\", \"Reader\", \"Request\", \"Response\", \"Headers\", \"URL\", \"JSON\", \"then\", \"try\", \"catch\"]\n    };\n  },\n  computed: {\n    jsText() {\n      let tmp = this.text;\n\n      for (let x of this.classes) {\n        tmp = this.setColor(tmp, x);\n      }\n\n      return tmp;\n    }\n\n  },\n  methods: {\n    setColor(text, word) {\n      let expr = new RegExp(`\\\\b${word}`, `mg`);\n      let newText = text.split(\"\\n\").map(item => item.split(expr).join(`<span class=\"${word}\">${word}</span>`));\n      newText = newText.join(\"\\n\").split(\"=>\").join(`<span class=\"arrow\">=></span>`);\n      let literals = newText.match(/`[\\s\\S][^`]*`/gmi);\n      if (literals) for (let lit of literals) {\n        newText = newText.split(lit).join(`<span class=\"literal\">${lit}</span>`);\n      }\n      newText = newText.split(\"•••\").join(`<span class=\"replaced\">•••</span>`);\n      return newText;\n    },\n\n    minify(text) {\n      return text.split(/[\\s]/gmi).join(\"\").split(String.fromCharCode(13)).join(\"\").split(String.fromCharCode(10)).join(\"\").split('<').join(\"&lt;\").split('>').join(\"&gt;\");\n    }\n\n  },\n\n  mounted() {\n    this.$root.$on(\"validate-answer\", function () {\n      let tmp = this.$el.innerText.split(/<[\\s\\S][^>]>/gmi).join(\"\");\n      this.$emit(\"update:text\", tmp);\n    }.bind(this));\n  },\n\n  template: `\n      <code v-html = \"jsText\"\n            :contenteditable = \"contenteditable\">\n      </code>\n  `\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (JSCodeElement);\n\n//# sourceURL=webpack:///./components/JS-code.js?");

/***/ }),

/***/ "./components/QuizComponent.js":
/*!*************************************!*\
  !*** ./components/QuizComponent.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var CSS_quiz_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! CSS/quiz.css */ \"./css/quiz.css\");\n/* harmony import */ var CSS_quiz_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(CSS_quiz_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var JS_QuizLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! JS/QuizLevel */ \"./components/QuizLevel.js\");\n\n\n\n\nconst QuizComponent = {\n  props: [],\n  data: function () {\n    return {\n      level: 1,\n      showQuize: true,\n      showResults: false,\n      status: 'work',\n      finish: null\n    };\n  },\n  computed: {\n    score() {\n      this.$root.$store.state.quizData.score;\n    },\n\n    lives() {\n      return this.$root.$store.state.quizData.lives;\n    },\n\n    quizData() {\n      return this.$root.$store.state.quizData;\n    },\n\n    startQuiz() {\n      return this.$root.startQuiz;\n    },\n\n    quizReady() {\n      return this.$root.$store.state.quizReady;\n    },\n\n    currentQuiz() {\n      return this.quizData.levels[this.level - 1];\n    },\n\n    maxScore() {\n      return this.$root.$store.state.quizData.maxScore;\n    },\n\n    results() {\n      return {\n        maxScore: this.$root.$store.state.quizData.maxScore,\n        score: this.$root.$store.state.quizData.score,\n        lives: this.$root.$store.state.quizData.lives\n      };\n    }\n\n  },\n  template: `\n      <div v-if = \"showQuize\">\n        <quiz-level :quizData = \"currentQuiz\"\n                      :level = \"level\"\n                      v-if = \"startQuiz\">\n        </quiz-level>\n    </div>\n    `,\n  components: {\n    'quiz-level': JS_QuizLevel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  methods: {\n    finishCallback() {\n      this.level = this.quizData.levels.length + 1;\n      this.$root.$store.commit(`saveAttemptResult`);\n      this.$root.$store.commit('pushLevelData', {\n        results: {\n          userPhoto: this.$root.$store.state.userInfo.photoURL || `https://www.shareicon.net/data/2015/12/14/2078${10 + Math.round(Math.random() * 10)}_face_300x300.png`,\n          userName: `${this.$root.$store.state.userInfo.fname} ${this.$root.$store.state.userInfo.name}`,\n          score: this.results.score,\n          lives: Math.max(this.lives, 0),\n          maxScore: this.results.maxScore\n        },\n        type: \"finish\",\n        fone: this.lives <= 0 ? \"failureSlide\" : this.results.score === this.results.maxScore ? \"successSlide\" : \"finishSlide\"\n      });\n      this.$root.$store.dispatch(\"saveResults\");\n    }\n\n  },\n  mounted: function () {\n    this.$on('save-quiz-level-results', function (results) {\n      this.$root.$store.commit('saveQuizResults', results);\n    });\n    this.$on('next-level', function () {\n      this.level += 1;\n      this.showResults = false;\n      this.lives <= 0 || this.level > this.quizData.levels.length ? this.finishCallback() : null;\n    });\n    this.$root.$on('exit-quiz', function () {\n      this.showQuize = false;\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (QuizComponent);\n\n//# sourceURL=webpack:///./components/QuizComponent.js?");

/***/ }),

/***/ "./components/QuizLevel.js":
/*!*********************************!*\
  !*** ./components/QuizLevel.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var JS_quizTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! JS/quizTemplate */ \"./components/quizTemplate.js\");\n/* harmony import */ var JS_JS_code__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! JS/JS-code */ \"./components/JS-code.js\");\n/* harmony import */ var JS_html_code__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! JS/html-code */ \"./components/html-code.js\");\n/* harmony import */ var CSS_js_classes_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! CSS/js-classes.css */ \"./css/js-classes.css\");\n/* harmony import */ var CSS_js_classes_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(CSS_js_classes_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var CSS_html_classes_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! CSS/html-classes.css */ \"./css/html-classes.css\");\n/* harmony import */ var CSS_html_classes_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(CSS_html_classes_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n\nconst QuizLevel = {\n  props: [\"level\"],\n  data: function () {\n    return {\n      selected: [],\n      answer: \"\",\n      lives: this.$root.$store.state.quizData.lives,\n      score: this.$root.$store.state.quizData.score,\n      maxScore: this.$root.$store.state.quizData.maxScore,\n      showResults: false,\n      levelResults: {\n        right: 0,\n        wrong: 0\n      }\n    };\n  },\n  components: {\n    'quiz-template': JS_quizTemplate__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    'js-code': JS_JS_code__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    'html-code': JS_html_code__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  computed: {\n    quizData() {\n      return JSON.parse(JSON.stringify(this.$parent.currentQuiz));\n    },\n\n    results() {\n      return {\n        lives: this.$root.$store.state.quizData.lives,\n        score: this.$root.$store.state.quizData.score,\n        maxScore: this.$root.$store.state.quizData.maxScore\n      };\n    },\n\n    params() {\n      var res = [];\n      this.quizData.picture ? res.push({\n        slotName: 'picture',\n        tabIcon: 'insert_photo'\n      }) : null;\n      this.quizData.js ? res.push({\n        slotName: 'js',\n        tabSymbol: \"{...}\"\n      }) : null;\n      this.quizData.html ? res.push({\n        slotName: 'html',\n        tabIcon: 'code'\n      }) : null;\n      this.quizData.type === 'choice' ? res.push({\n        slotName: 'choice',\n        tabIcon: 'touch_app'\n      }) : null;\n      this.quizData.type === 'input' ? res.push({\n        slotName: 'text',\n        tabIcon: 'keyboard'\n      }) : null;\n      this.quizData.type === 'findError' ? res.push({\n        slotName: 'findError',\n        tabIcon: 'developer_board'\n      }) : null;\n      this.quizData.type === 'finish' ? res.push({\n        slotName: 'results',\n        tabIcon: 'ballot_outline'\n      }) : null;\n      return res;\n    }\n\n  },\n  methods: {\n    coloring(text, lang) {\n      return `<code data-language=\"${lang}\">${text}</code>`;\n    },\n\n    minify(str) {\n      return str.split(/[\\s]/gmi).join(\"\").split(String.fromCharCode(13)).join(\"\").split(String.fromCharCode(10)).join(\"\").split('<').join(\"&lt;\").split('>').join(\"&gt;\");\n    },\n\n    findError() {\n      this.$root.$emit(\"validate-answer\");\n      var result = this.minify(this.quizData.wrongContent);\n      var etalon = this.minify(this.quizData.rightContent);\n      var tst = result === etalon;\n      this.levelResults = {\n        right: 0 + tst,\n        wrong: 0 + !tst\n      };\n    },\n\n    choice() {\n      this.levelResults = {\n        right: 0,\n        wrong: 0\n      };\n\n      for (var sel of this.selected) {\n        this.quizData.rightChoicesNums.indexOf(sel) < 0 ? this.levelResults.wrong += 1 : this.levelResults.right += 1;\n      }\n    },\n\n    input() {\n      let x = this.quizData.rightInput.some(rightAnswer => this.minify(this.answer) === this.minify(rightAnswer));\n      this.levelResults = {\n        right: 0 + x,\n        wrong: 0 + !x\n      };\n    },\n\n    finish() {},\n\n    validateAnswer() {\n      this[this.quizData.type]();\n      this.$root.$store.commit('saveQuizResults', {\n        score: this.levelResults.right * this.quizData.balls,\n        lives: this.levelResults.wrong\n      });\n      this.lives = this.$root.$store.state.quizData.lives;\n      this.score = this.$root.$store.state.quizData.score;\n      this.showResults = true;\n      this.snackbar = true;\n    },\n\n    nextLevel() {\n      this.answer = \"\";\n      this.selected = [];\n      this.$parent.$emit('next-level');\n      this.showResults = false;\n    },\n\n    exitQuiz() {\n      this.$root.$emit('exit-quiz');\n    }\n\n  },\n\n  mounted() {\n    this.$root.$on(\"test-results\", function (testResult) {\n      console.log(testResult);\n    });\n  },\n\n  template: `\n    <quiz-template :params = \"params\">\n        <div slot = \"question\" v-if = \"quizData.type !== 'finish'\" style=\"padding: 5px 20px\">\n            <v-avatar color=\"warning\">{{level}}</v-avatar>\n            {{ quizData.question }}\n        </div>\n\n        <v-card-text slot = \"choice\" class = \"transparent\">\n            <v-checkbox color=\"#fff\"\n                        v-for = \"( ch, ind ) in quizData.choiceVariants\"\n                        :key = \"ind\"\n                        :label = \"ch\"\n                        :value = \"ind\"\n                        hide-details\n                        v-model = \"selected\">\n            </v-checkbox>\n        </v-card-text>\n\n        <div slot = \"picture\" v-if = \"quizData.picture\"\n             class=\"card card--flat\" style=\"height: auto;\">\n           <img class=\"card__media\"\n                style=\"height: auto; margin: 50px 20px;\"\n                :src=\"quizData.picture\"\n           />\n        </div>\n\n        <v-card-text slot = \"text\" class = \"transparent\"\n                     v-if = \"quizData.type === 'input'\">\n            <v-text-field :suffix = \"quizData.inputLegend ?\n                                     quizData.inputLegend.after : ''\"\n                          :prefix = \"quizData.inputLegend ?\n                                     quizData.inputLegend.before : ''\"\n                          filled\n                          v-model = \"answer\"\n                          style = \"max-width:fit-content;\">\n            </v-text-field>\n        </v-card-text>\n\n        <v-card-text slot = \"html\" class = \"transparent\"\n                     v-if = \"quizData.html\">\n            <html-code :text = \"quizData.html\">\n            </html-code>\n        </v-card-text>\n\n        <v-card slot = \"js\" class = \"transparent\"\n                v-if = \"quizData.js\">\n              <js-code :text = \"quizData.js\"\n                        contenteditable=false>\n              </js-code>\n        </v-card>\n\n        <v-card-text slot = \"findError\"\n                     v-if = \"quizData.type === 'findError'\">\n              <js-code v-bind:text.sync = \"quizData.wrongContent\"\n                       contenteditable = true>\n              </js-code>\n        </v-card-text>\n\n        <v-card-text slot = \"results\" :class=\"quizData.fone\"\n                     v-if = \"quizData.type === 'finish'\">\n              <v-container fluid grid-list-lg>\n                  <v-avatar size = \"100px\">\n                    <img :src = \"quizData.results.userPhoto\">\n                  </v-avatar>\n                  <h3>{{quizData.results.userName}}</h3>\n              </v-container>\n            <hr/>\n              <v-container fluid grid-list-lg>\n                  <h4 class = \"white--text text--shadow\">\n                      <v-icon x-large class = \"warning--text\">\n                        assessment\n                      </v-icon>\n                      Набрано очков {{ quizData.results.score }}\n                  </h4>\n                  <h4 class = \"white--text text--shadow\">\n                      <v-icon x-large class= \"white--text\">\n                            stars\n                      </v-icon>\n                      из {{ quizData.results.maxScore }} возможных\n                  </h4>\n                  <h4 class = \"white--text text--shadow\">\n                      <v-icon x-large>\n                          battery_charging_full\n                      </v-icon> Осталось жизней {{ quizData.results.lives }}\n                  </h4>\n              </v-container>\n        </v-card-text>\n      </quiz-template>\n  `\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (QuizLevel);\n\n//# sourceURL=webpack:///./components/QuizLevel.js?");

/***/ }),

/***/ "./components/html-code.js":
/*!*********************************!*\
  !*** ./components/html-code.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nconst htmlCodeElement = {\n  props: [\"text\"],\n  data: function () {\n    return {\n      attrs: [\"width\", \"height\", \"src\", \"href\", \"for\", \"onchange\", \"onclick\", \"oninput\", \"id\", \"value\", \"contenteditable\", \"disabled\", \"download\", \"enctype\", \"hidden\", \"integrity\", \"placeholder\", \"target\", \"title\", \"type\", \"wrap\", \"rows\", \"rowspan\"]\n    };\n  },\n  computed: {\n    htmlText() {\n      return this.coloringHTML(this.text);\n    }\n\n  },\n  methods: {\n    coloringHTML(text) {\n      let matches = text.match(/<[^\\s^>]*[\\/]*[>]*/gim);\n      let strings = text.match(/(['\"])[^\\s]*?\\1/gim);\n      if (!matches) return text;\n      let newHTML = text.split(\"class\").join(`_____`);\n\n      for (let m of matches) {\n        newHTML = newHTML.split(m).join(`<span class=\"tag\">${m.replace(\"<\", \"&lt;\")}</span>`);\n      }\n\n      for (let x of this.attrs) {\n        newHTML = newHTML.split(x).join(`<span class=\"attr\">${x}</span>`);\n      }\n\n      if (strings) for (let x of strings) {\n        newHTML = newHTML.split(x).join(`<span class=\"values\">${x}</span>`);\n      }\n      newHTML = newHTML.split(\"_____\").join(`<span class=\"attr\">class</span>`);\n      return newHTML;\n    }\n\n  },\n\n  mounted() {},\n\n  template: `\n      <code v-html = \"htmlText\"></code>\n  `\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlCodeElement);\n\n//# sourceURL=webpack:///./components/html-code.js?");

/***/ }),

/***/ "./components/quizTemplate.js":
/*!************************************!*\
  !*** ./components/quizTemplate.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n // import CubeComponent from 'JS/cube'\n// import Canvas from 'JS/CanvasComponent'\n\nconst quizTemplate = {\n  props: [\"params\"],\n  data: function () {\n    return {\n      dialog: true,\n      activeTab: null,\n      snackbar: false,\n      showCube: true,\n      spacing: \"px-xs-2 px-sm-4 px-md-6 px-lg-8 px-xl-10 mx-xs-0 mx-sm-4 mx-md-6 mx-lg-12\",\n      mainHeight: 0,\n      maxWidth: 900,\n      question: null,\n      controls: null\n    };\n  },\n  watch: {\n    params: function (newVal, oldVal) {\n      this.activeTab = \"0\";\n    }\n  },\n  methods: {\n    answerIsReady: function () {\n      this.$parent.validateAnswer();\n      this.snackbar = true;\n    },\n    nextLevel: function () {\n      this.snackbar = false;\n      this.$parent.nextLevel();\n    },\n\n    resizeWin() {\n      this.mainHeight = this.question && this.controls ? window.innerHeight - this.question.offsetHeight - this.controls.offsetHeight - 96 : window.innerHeight * 0.7;\n    }\n\n  },\n  components: {// 'canvas-element': Canvas\n  },\n  mounted: function () {\n    this.question = document.getElementById(\"question\");\n    this.controls = document.getElementById(\"controls\");\n    this.resizeWin();\n  },\n  template: `\n    <v-container text-xs-center\n                 fluid\n                 class=\"dark-glass\">\n          <v-card id=\"question\" :max-width=\"maxWidth\" class=\"mx-auto dark-glass\">\n            <slot name=\"question\"></slot>\n          </v-card>\n\n          <v-container fluid class=\"transparent\">\n\n              <v-card fluid :max-width=\"maxWidth\"\n                            :height=\"mainHeight\"\n                            v-resize=\"resizeWin\"\n                            class=\"mx-auto dark-glass\"\n                            style=\"overflow-y: auto\">\n\n                    <v-tabs v-model=\"activeTab\" slider-color=\"warning\" dark class=\"dark-glass\">\n\n                        <v-tab  v-for=\"( item, index ) in params\" :key=\"index\" ripple>\n                            <span v-if='item.tabSymbol'>{{ item.tabSymbol }}</span>\n                            <v-icon v-if='item.tabIcon'>{{ item.tabIcon }}</v-icon>\n                        </v-tab>\n\n                        <v-tab-item v-for=\"( item, index ) in params\" :key=\"index\">\n                            <v-card dark text transparent>\n                                <slot :name=\"item.slotName\"></slot>\n                            </v-card>\n                        </v-tab-item>\n                    </v-tabs>\n              </v-card>\n\n              <!--<canvas-element></canvas-element>-->\n\n          </v-container>\n\n          <v-card id=\"controls\" :max-width=\"maxWidth\" dark elevation=0 class=\"transparent mx-auto dark-glass\">\n              <v-row>\n                <v-col cols=\"auto\">\n                  <v-card class=\"py-1 px-2\">\n                    <v-badge color=\"success\">\n                      <span slot = \"badge\">{{ $parent.lives }}</span>\n                        <v-icon color = \"warning\">\n                            battery_charging_full\n                        </v-icon>\n                    </v-badge>\n                  </v-card>\n                </v-col>\n\n                <v-col cols=\"auto\">\n                  <v-card class=\"py-1 px-2\">\n                    <v-badge color = \"success\">\n                        <span slot = \"badge\">{{ $parent.score }}</span>\n                        <span> {{ $parent.$parent.maxScore }} </span>\n                    </v-badge>\n                  </v-card>\n                </v-col>\n\n                <v-spacer></v-spacer>\n\n                <v-col cols=\"auto\">\n                  <v-card>\n                    <v-tooltip top\n                               v-if = \"!$parent.showResults && $parent.quizData.type !== 'finish'\"\n                               color=\"transparent\">\n                      <template v-slot:activator=\"{ on }\">\n                        <v-btn icon @click = \"answerIsReady\"\n                                    v-on= \"on\">\n                            <v-icon>send</v-icon>\n                        </v-btn>\n                      </template>\n                      <span>Check result</span>\n                    </v-tooltip>\n                  </v-card>\n                </v-col>\n\n                <v-col cols=\"auto\">\n                  <v-card>\n                    <v-tooltip top\n                               v-if = \"$parent.quizData.type !== 'finish'\"\n                               color=\"transparent\">\n                      <template v-slot:activator=\"{ on }\">\n                        <v-btn icon @click = \"nextLevel\"\n                                    v-on=\"on\">\n                            <v-icon>forward</v-icon>\n                        </v-btn>\n                      </template>\n                      <span>Next</span>\n                    </v-tooltip>\n                  </v-card>\n                </v-col>\n\n                <v-col cols=\"auto\">\n                  <v-card>\n                    <v-tooltip top color=\"transparent\">\n                      <template v-slot:activator=\"{ on }\">\n                        <v-btn icon @click = \"$parent.exitQuiz\"\n                                    v-on=\"on\">\n                            <v-icon>exit_to_app</v-icon>\n                        </v-btn>\n                      </template>\n                      <span>Exit</span>\n                    </v-tooltip>\n                  </v-card>\n                </v-col>\n            </v-row>\n          </v-card>\n\n          <slot name=\"snackbar\"></slot>\n\n          <v-snackbar slot=\"snackbar\"\n                      :timeout=\"5000\"\n                      left top\n                      multi-line\n                      vertical\n                      color=\"#333\"\n                      v-if = \"snackbar\"\n                      v-model = \"snackbar\">\n              <v-row>\n                <v-col cols=\"auto\">\n                  <v-badge xs1 color=\"success\">\n                        <span slot = \"badge\">{{ $parent.levelResults.right }}</span>\n                        <v-icon color = \"warning\">\n                            thumb_up\n                        </v-icon>\n                  </v-badge>\n                </v-col>\n                <v-col cols=\"auto\">\n                  <v-badge xs1 color=\"error\">\n                    <span slot = \"badge\">{{ $parent.levelResults.wrong }}</span>\n                    <v-icon color = \"warning\">\n                        thumb_down\n                    </v-icon>\n                  </v-badge>\n                </v-col>\n                <v-spacer></v-spacer>\n                <v-col cols=\"auto\">\n                  <v-btn  text icon color=\"warning\"\n                          @click.native = \"snackbar = false\">\n                      <v-icon>close</v-icon>\n                  </v-btn>\n                </v-col>\n              </v-row>\n          </v-snackbar>\n    </v-container>\n    `\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (quizTemplate);\n\n//# sourceURL=webpack:///./components/quizTemplate.js?");

/***/ }),

/***/ "./css/html-classes.css":
/*!******************************!*\
  !*** ./css/html-classes.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/style-loader/dist!../node_modules/css-loader/dist/cjs.js!./html-classes.css */ \"./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./css/html-classes.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"ca911d96\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./css/html-classes.css?");

/***/ }),

/***/ "./css/js-classes.css":
/*!****************************!*\
  !*** ./css/js-classes.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/style-loader/dist!../node_modules/css-loader/dist/cjs.js!./js-classes.css */ \"./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./css/js-classes.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"4cd6c896\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./css/js-classes.css?");

/***/ }),

/***/ "./css/quiz.css":
/*!**********************!*\
  !*** ./css/quiz.css ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/style-loader/dist!../node_modules/css-loader/dist/cjs.js!./quiz.css */ \"./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./css/quiz.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"54eaaed6\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./css/quiz.css?");

/***/ }),

/***/ "./images/failure.gif":
/*!****************************!*\
  !*** ./images/failure.gif ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/failure.gif\";\n\n//# sourceURL=webpack:///./images/failure.gif?");

/***/ }),

/***/ "./images/game-over.gif":
/*!******************************!*\
  !*** ./images/game-over.gif ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/game-over.gif\";\n\n//# sourceURL=webpack:///./images/game-over.gif?");

/***/ }),

/***/ "./images/success.gif":
/*!****************************!*\
  !*** ./images/success.gif ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/success.gif\";\n\n//# sourceURL=webpack:///./images/success.gif?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/html-classes.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/html-classes.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".tag {\\r\\n  color: rgb(255, 170, 255);\\r\\n}\\r\\n.attr {\\r\\n  color: rgb(0, 180, 255);\\r\\n}\\r\\n.values {\\r\\n  color: rgb(255, 255, 170);\\r\\n}\\r\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./css/html-classes.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/js-classes.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/js-classes.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"textarea {\\r\\n  background-color: var(--darkPrimary)!important;\\r\\n  letter-spacing: 0.7px!important;\\r\\n  padding: 20px!important;\\r\\n  color: #aab!important;\\r\\n}\\r\\ncode {\\r\\n    /* background-color: var(--darkPrimary)!important; */\\r\\n    background-color: transparent;\\r\\n    font-size: 1.05rem!important;\\r\\n    color: #abb!important;\\r\\n    box-shadow: none!important;\\r\\n    font-weight: normal!important;\\r\\n    margin: 20px;\\r\\n    outline: none;\\r\\n}\\r\\n\\r\\n.var, .let, .const, .function,\\r\\n.new, .if, .for, .yield, .async, .await {\\r\\n  color: var(--specWordsColor);\\r\\n  font-style:italic;\\r\\n  font-weight:bold;\\r\\n}\\r\\n\\r\\n.true, .false {\\r\\n  color: rgb(2, 218, 192);\\r\\n}\\r\\n\\r\\n.undefined, .null, .NaN, .Infinity {\\r\\n  color: var(--userNamesColor);\\r\\n  font-weight:bold;\\r\\n  font-style:italic;\\r\\n}\\r\\n\\r\\n.Object, .Number, .Date,\\r\\n.String, .Boolean, .Math,\\r\\n.Error, .Event, .JSON {\\r\\n  color: rgb(6, 139, 248);\\r\\n}\\r\\n\\r\\n.constructor, .class {\\r\\n  color: rgb(6, 200, 248);\\r\\n}\\r\\n\\r\\n.__proto__, .prototype, .this {\\r\\n  color: var(--greenText);\\r\\n}\\r\\n\\r\\n.window, .document, .console,\\r\\n.location, .history,\\r\\n.localStorage, .cookie {\\r\\n  color: rgb(4, 213, 228);\\r\\n}\\r\\n\\r\\n.fetch, .XMLHttpRequest,\\r\\n.Response, .Request,\\r\\n.Promise, .Headers,\\r\\n.URL, .Reader, .File,\\r\\n.Buffer, .Array, .Blob {\\r\\n    color: rgb(255, 166, 0);\\r\\n}\\r\\n\\r\\n.try, .then, .catch, .arrow, .return {\\r\\n    color: rgb(255, 200, 150);\\r\\n}\\r\\n\\r\\n.literal {\\r\\n  color: rgb(176, 182, 125);\\r\\n  font-style: italic;\\r\\n  font-weight:lighter;\\r\\n}\\r\\n\\r\\n.replaced {\\r\\n  color: red;\\r\\n}\\r\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./css/js-classes.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/quiz.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/quiz.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar getUrl = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ../images/game-over.gif */ \"./images/game-over.gif\"));\nvar ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! ../images/success.gif */ \"./images/success.gif\"));\nvar ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! ../images/failure.gif */ \"./images/failure.gif\"));\n// Module\nexports.push([module.i, \"/* .quiz-container {\\r\\n    position: fixed;\\r\\n    top:20%;\\r\\n    bottom:10%;\\r\\n    left:8%;\\r\\n    right:8%;\\r\\n    border:solid 1px white;\\r\\n    overflow:auto;\\r\\n    padding: 10px 20px;\\r\\n} */\\r\\n\\r\\n.quiz-container{\\r\\n    position:fixed;\\r\\n    top:0;\\r\\n    left:0;\\r\\n    bottom:30px;\\r\\n    right:0\\r\\n}\\r\\n\\r\\n.quiz-container-actions {\\r\\n    position: fixed;\\r\\n    height:50px;\\r\\n    bottom:10%;\\r\\n    left:8%;\\r\\n    right:8%;\\r\\n    border:solid 1px white;\\r\\n}\\r\\n.quiz-container-question {\\r\\n    position: fixed;\\r\\n    top:10%;\\r\\n    height:auto;\\r\\n    left:8%;\\r\\n    right:8%;\\r\\n    border:solid 1px white;\\r\\n    padding: 10px 20px;\\r\\n}\\r\\n.badge {\\r\\n    margin: 18px 20px 5px 20px;\\r\\n}\\r\\n.text--shadow {\\r\\n    font-weight: bold;\\r\\n    text-shadow: 2px 2px 4px #000000aa;\\r\\n}\\r\\n\\r\\n.finishSlide, .successSlide, .failureSlide {\\r\\n  height:700px;\\r\\n  background-size: cover;\\r\\n}\\r\\n.finishSlide {\\r\\n  background-image: url(\" + ___CSS_LOADER_URL___0___ + \");\\r\\n}\\r\\n.successSlide {\\r\\n  background-image: url(\" + ___CSS_LOADER_URL___1___ + \");\\r\\n}\\r\\n.failureSlide {\\r\\n  background-image: url(\" + ___CSS_LOADER_URL___2___ + \");\\r\\n}\\r\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./css/quiz.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./css/html-classes.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js!./css/html-classes.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./html-classes.css */ \"./node_modules/css-loader/dist/cjs.js!./css/html-classes.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./css/html-classes.css?./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./css/js-classes.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js!./css/js-classes.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./js-classes.css */ \"./node_modules/css-loader/dist/cjs.js!./css/js-classes.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./css/js-classes.css?./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./css/quiz.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js!./css/quiz.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./quiz.css */ \"./node_modules/css-loader/dist/cjs.js!./css/quiz.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./css/quiz.css?./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js");

/***/ })

}]);