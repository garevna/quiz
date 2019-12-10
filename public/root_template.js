(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["root_template"],{

/***/ "./components/root_template.js":
/*!*************************************!*\
  !*** ./components/root_template.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: `\n\t<v-app dark class = \"main-content\" v-resize=\"windowResized\">\n\t\t\t<parallax-back></parallax-back>\n\n\t\t\t\t<v-app-bar app class=\"dark-glass\"\n\t\t\t\t\t\t\t\t\t v-if=\"mainMenuReady && !startQuiz && (!sign_up_process) && (!sign_in_process)\">\n\n\t\t\t\t\t\t<!--<img class=\"center-js\"\n\t\t\t\t\t\t     src=\"https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fjs-icon.svg\"\n\t\t\t\t\t\t\t\t @click.stop = \"drawer = !drawer\">-->\n\n\t\t\t\t\t\t<div class=\"center-js\" @click = \"drawer = !drawer\">\n\t\t\t\t\t\t    <canvas-element color=\"#fa0\" width=\"100\" height=\"90\"></canvas-element>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<v-toolbar-title v-if=\"login\">\n\t\t\t\t\t\t\t<v-avatar v-if=\"user.photoURL\">\n\t\t\t\t\t\t\t\t<img :src=\"user.photoURL\">\n\t\t\t\t\t\t\t</v-avatar>\n\t\t\t\t\t\t\t{{user.fname + \" \" + user.name}}\n\t\t\t\t\t\t</v-toolbar-title>\n\t\t\t\t\t\t<v-spacer></v-spacer>\n\t\t\t\t\t\t<v-menu offset-y>\n\t\t\t\t\t\t  <template v-slot:activator=\"{ on, attrs }\">\n\t\t\t\t\t\t\t\t<v-btn icon\n\t\t\t\t\t\t\t\t       v-bind=\"attrs\"\n\t                     v-on=\"on\">\n\t\t\t\t\t\t\t\t\t\t<v-icon large accent>more_vert</v-icon>\n\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<v-list>\n\t\t\t\t\t\t\t\t\t\t<v-list-item @click = \"sign_up_process=true\">\n\t\t\t\t\t\t\t\t\t\t  <v-list-item-content>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-list-item-title>Sign up</v-list-item-title>\n\t\t\t\t\t\t\t\t\t\t  </v-list-item-content>\n\t\t\t\t\t\t\t\t\t\t</v-list-item>\n\t\t\t\t\t\t\t\t\t\t<v-list-item @click = \"sign_in_process=true\">\n\t\t\t\t\t\t\t\t\t\t  <v-list-item-content>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-list-item-title>Sign in</v-list-item-title>\n\t\t\t\t\t\t\t\t\t\t\t</v-list-item-content>\n\t\t\t\t\t\t\t\t\t\t</v-list-item>\n\t\t\t\t\t\t\t\t\t\t<v-list-item @click = \"showInfo=true\" :disabled=\"!login\">\n\t\t\t\t\t\t\t\t\t\t  <v-list-item-content>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-list-item-title>Достижения</v-list-item-title>\n\t\t\t\t\t\t\t\t\t\t  </v-list-item-content>\n\t\t\t\t\t\t\t\t\t\t</v-list-item>\n\t\t\t\t\t\t\t</v-list>\n\t\t\t\t\t\t</v-menu>\n\t\t\t\t</v-app-bar>\n\n\t\t\t\t<sign-up-component v-if=\"sign_up_process\"></sign-up-component>\n\t\t\t\t<login-component v-if=\"sign_in_process\"></login-component>\n\n\t\t\t\t<v-footer class=\"glass\" app v-if=\"showFooter\">\n\n\t\t\t\t\t<img src = \"./images/personage.gif\" width=\"30\" style=\"position:absolute; bottom:0;\">\n\t\t\t\t\t<v-spacer></v-spacer>\n\t\t\t\t\t<v-tooltip top nudge-top=\"-15\" color=\"transparent\">\n\t\t\t\t\t  <template v-slot:activator=\"{ on }\">\n\t\t\t\t\t\t  <span v-on=\"on\" dark transparent>\n\t\t\t\t\t\t\t  &copy;&nbsp;Irina Fylyppova 2018\n\t\t\t\t\t\t  </span>\n\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<img src=\"./images/my-photo.jpg\" width=\"100\">\n\t\t\t\t\t</v-tooltip>\n\t\t\t\t</v-footer>\n\n\t\t\t\t<quiz-component v-if = \"quizReady && startQuiz\">\n\t\t\t\t</quiz-component>\n\t\t<nav-panel :states = \"mainMenuItems\"></nav-panel>\n\t\t<user-info :showInfo=\"showInfo\"></user-info>\n\t</v-app>\n\t`\n});\n\n//# sourceURL=webpack:///./components/root_template.js?");

/***/ })

}]);