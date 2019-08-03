'use strict'

import cubeCSS from 'CSS/cube.css'

const Cube = ( 'cube-element', {
  props: [ "front", "back", "left", "right", "top", "bottom", "place", "dimension" ],
  data: function () {
    return {
      position: [],
      defaultPosition: [ 5, 5 ],
      size: [],
      defaultSize: [ 30, 15 ],
      step: 1,
      defaultPicture: "https://garevna.github.io/js-samples/images/8.jpg",
      perspective: 500,

      perspective_origin: {
      		current: { x: 50, y: 100 },
      		increment: { x: 1, y: -1 },
      		min_val: { x: -150, y: -150 },
      		max_val: { x: 150, y: 150 }
      },

      cube: null,

      transformation: {
          back:   { rotation: [  0,   0,  0 ], translate: [] },
          bottom: { rotation: [ 90,   0,  0 ], translate: [] },
          front:  { rotation: [  0,   0,  0 ], translate: [] },
          left:   { rotation: [  0, -90,  0 ], translate: [] },
          right:  { rotation: [  0, -90,  0 ], translate: [] },
          top:    { rotation: [ 90,   0,  0 ], translate: [] }
      }
    }
  },
  computed: {
    mainSize () {
      // this.size = this.dimension.split(",").map ( item => parseInt ( item ) )
      // let minWin = Math.min ( window.innerHeight, window.innerWidth )
      // console.log ("mainSize: ", size ? Math.min ( ...size ) * minWin / 100 : minWin * 0.3 )
      // console.log ( "mainSize: ", this.dimension ? Math.min ( ...this.dimension.split(",").map(item => Number( item.trim() ) ) ) : 100 )
      return this.dimension ? Math.min ( ...this.dimension.split(",").map(item => Number( item.trim() ) ) ) : 100
    },

    // pad () {
    //     let poz = this.getAttribute ( "place" ).split(",")
    //         .map( item => item.trim() )
    //     return poz.length > 1 ? `${poz[0]}px ${poz[1]}px` : "10%"
    // }
  },
  template: `
        <!-- <v-layout align-center justify-center row fill-height class = "transparent">
          <v-flex xs10 class = "ml-3">-->
             <main>
                <section id="perspective-container">
                  <figure class="face" id="back"></figure>
                  <figure class="face" id="bottom"></figure>
                  <figure class="face" id="top"></figure>
                  <figure class="face" id="left"></figure>
                  <figure class="face" id="right"></figure>
                  <figure class="face" id="front"></figure>
                </section>
            </main>
          <!--</v-flex>
        </v-layout>-->`,
  watch: {

  },
  methods: {
    setCubeStyle () {
        this.cube.style = `
            margin-top: ${this.position[1]}px;
            margin-left: ${this.position[0]}px;
            width: ${this.mainSize}px;
            height: ${this.mainSize}px;
        `
    },
    setBackground ( side ) {
        side.style.backgroundImage = `url( ${ this[side.id] } )`
        side.style.mixBlendMode = "screen"
    },

    setCubeSidesTranslate () {
        this.transformation ["back"].translate =   [             0,             0,             0 ]
    		this.transformation ["bottom"].translate = [             0, this.mainSize,             0 ]
    		this.transformation ["front"].translate =  [             0,             0, this.mainSize ]
    		this.transformation ["left"].translate =   [             0,             0,             0 ]
    		this.transformation ["right"].translate =  [ this.mainSize,             0,             0 ]
    		this.transformation ["top"].translate =    [             0,             0,             0 ]
    },

    getIncrement ( coord ) {
        let current = this.perspective_origin.current
        let increment = this.perspective_origin.increment
        let maxVal = this.perspective_origin.max_val
        let minVal = this.perspective_origin.min_val

        increment[ coord ] = current[ coord ] <= minVal[ coord ] ? this.step :
            current[ coord ] >= maxVal[ coord ] ? -this.step : increment[ coord ]

        return increment[ coord ]
    },

    rotateCube () {
        this.perspective_origin.current.x += this.getIncrement ( "x" )
        this.perspective_origin.current.y += this.getIncrement ( "y" );

        [ "WebkitPerspectiveOrigin", "MozPerspectiveOrigin", "perspectiveOrigin" ]
            .forEach (
                item => this.cube.style [ item ] = `${this.perspective_origin.current.x}% ${this.perspective_origin.current.y}%`
            )
  	},
    animate () {
        this.rotateCube()
        requestAnimationFrame ( this.animate )
    },
    setPerspective () {
      this.cube.style.WebkitPerspective =
          this.cube.style.perspective =
              this.perspective + "px"
    },
    initScene () {
        this.setPerspective ()
    		this.setCubeSidesTranslate ()
    		this.cubeResize ()
  	},
    cubeResize () {

  			this.setCubeSidesTranslate ()

        Array.from ( this.cube.children ).forEach (
          side => {
            side.style.width = `${this.mainSize}px`
            side.style.height = `${this.mainSize}px`
            let translate = `
                translateX(${this.transformation[side.id].translate [ 0 ]}px)
                translateY(${this.transformation[side.id].translate [ 1 ]}px)
                translateZ(${this.transformation[side.id].translate [ 2 ]}px)`
            let rotation = `
                rotateX(${this.transformation[side.id].rotation [ 0 ]}deg)
                rotateY(${this.transformation[side.id].rotation [ 1 ]}deg)
                rotateZ(${this.transformation[side.id].rotation [ 2 ]}deg)`;

            [ "WebkitTransform", "style.MozTransform", "MsTransform", "transform" ]
                .forEach ( prop => side.style[prop] = translate + rotation )
          }
        )
  	}
  },
  mounted: function () {
      this.cube = document.getElementById ( "perspective-container" )
      this.setCubeStyle ()
      this.cubeResize ()

      Array.from ( this.cube.children ).forEach (
        side => this.setBackground ( side )
      )

      this.initScene ()
      this.setCubeSidesTranslate ()
      this.animate ()
  }
})

export default Cube
