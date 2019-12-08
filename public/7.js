(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./components/parallax.js":
/*!********************************!*\
  !*** ./components/parallax.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nconst Parallax = (\"parallax-back\", {\n  data: function () {\n    return {\n      moveCounter: 0,\n      pictureCounter: 0,\n      pictures: [402, 702, 516, 404, 405, 406, 705, 408, 509, 440, 410, 448, 704, 417, 147, 316],\n      parallax: null\n    };\n  },\n  template: `\n      <section id=\"parallax-container\">\n          <div id=\"parallax-element\"></div>\n      </section>\n    `,\n  methods: {\n    changePicture() {\n      let num = Math.round(Math.random() * (this.pictures.length - 1));\n      this.parallax.style.backgroundImage = `url(https://picsum.photos/id/${this.pictures[num]}/1500/900)`;\n    },\n\n    loopParallax() {\n      if (this.pictureCounter-- === 0) {\n        this.pictureCounter = 600;\n        this.changePicture();\n      }\n\n      if (this.moveCounter-- === 0) {\n        this.moveCounter = 240;\n        let src = this.parallax.style.backgroundImage;\n        let position = [\"top\", \"left\", \"right\", \"bottom\", \"center\"][Math.round(Math.random() * 4)];\n        this.parallax.style = `\n              width: ${window.innerWidth * (1 + Math.random() * 0.3)}px;\n              height: ${window.innerHeight * (1 + Math.random() * 0.3)}px;\n              background-position: ${position};\n              background-image: ${src};\n              background-size: cover;\n              transition: all 2s ease;\n          `;\n      }\n\n      requestAnimationFrame(this.loopParallax.bind(this));\n    }\n\n  },\n\n  mounted() {\n    let container = document.getElementById(\"parallax-container\");\n    container.style = `\n        position:fixed;\n        top:0;\n        left:0;\n        bottom: 0;\n        right:0;\n        overflow: hidden;\n        box-sizing: border-box;\n        margin:0;\n        transition: all 2s ease;\n      `;\n    this.parallax = document.getElementById(\"parallax-element\");\n    this.parallax.style = `\n        width:100vw;\n        height: 100vh;\n        background-repeat: no-repeat;\n        background-size: cover;\n        background-position: center;\n        transition: all 2s ease;\n      `;\n    this.loopParallax();\n  }\n\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (Parallax);\n\n//# sourceURL=webpack:///./components/parallax.js?");

/***/ })

}]);