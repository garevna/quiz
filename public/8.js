(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{130:function(t,n,e){"use strict";e.r(n);const a={data:function(){return{moveCounter:0,pictureCounter:0,pictures:[402,702,516,404,405,406,705,408,509,440,410,448,704,417,147,316],parallax:null}},template:'\n      <section id="parallax-container">\n          <div id="parallax-element"></div>\n      </section>\n    ',methods:{changePicture(){let t=Math.round(Math.random()*(this.pictures.length-1));this.parallax.style.backgroundImage=`url(https://picsum.photos/id/${this.pictures[t]}/1500/900)`},loopParallax(){if(0==this.pictureCounter--&&(this.pictureCounter=600,this.changePicture()),0==this.moveCounter--){this.moveCounter=240;let t=this.parallax.style.backgroundImage,n=["top","left","right","bottom","center"][Math.round(4*Math.random())];this.parallax.style=`\n              width: ${window.innerWidth*(1+.3*Math.random())}px;\n              height: ${window.innerHeight*(1+.3*Math.random())}px;\n              background-position: ${n};\n              background-image: ${t};\n              background-size: cover;\n              transition: all 2s ease;\n          `,console.log(this.parallax.style["background-position"])}requestAnimationFrame(this.loopParallax.bind(this))}},mounted(){document.getElementById("parallax-container").style="\n        position:fixed;\n        top:0;\n        left:0;\n        bottom: 0;\n        right:0;\n        overflow: hidden;\n        box-sizing: border-box;\n        margin:0;\n        transition: all 2s ease;\n      ",this.parallax=document.getElementById("parallax-element"),this.parallax.style="\n        width:100vw;\n        height: 100vh;\n        background-repeat: no-repeat;\n        background-size: cover;\n        background-position: center;\n        transition: all 2s ease;\n      ",this.loopParallax()}};n.default=a}}]);