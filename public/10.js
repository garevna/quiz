(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./components/userInfo.js":
/*!********************************!*\
  !*** ./components/userInfo.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nconst UserInfo = {\n  props: [\"showInfo\"],\n\n  data() {\n    return {};\n  },\n\n  computed: {\n    user() {\n      return this.$root.$store.state.userInfo;\n    },\n\n    resultsHeaders() {\n      return Object.keys(this.$root.$store.state.userResults);\n    },\n\n    results() {\n      return Object.values(this.$root.$store.state.userResults);\n    }\n\n  },\n  template: `\n       <v-dialog max-width = \"400\" v-model = \"showInfo\">\n                <v-card v-for = \"( item, index ) in resultsHeaders\"\n                        :key=\"index\"\n                        dark>\n                    <v-card-title class = \"warning--text\">\n                          {{item}}\n                    </v-card-title>\n                    <v-card-text v-for = \"( attempt, ind ) in results[index]\"\n                                 :key=\"ind\">\n                      <v-icon>star_circle</v-icon>\n                      {{attempt}}\n                    </v-card-text>\n                </v-card>\n                <v-card-actions>\n                    <v-spacer></v-spacer>\n                    <v-btn text dark\n                           @click.native = \"closeInfo\">\n                           Close\n                    </v-btn>\n                </v-card-actions>\n        </v-dialog>\n    `,\n  methods: {\n    closeInfo() {\n      this.$root.$emit('close-info');\n    }\n\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserInfo);\n\n//# sourceURL=webpack:///./components/userInfo.js?");

/***/ })

}]);