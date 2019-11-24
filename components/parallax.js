'use strict'

const Parallax = ( "parallax-back", {
    data: function () {
      return {
        moveCounter: 0,
        pictureCounter: 0,
        pictures: [ 402, 702, 516, 404, 405, 406, 705, 408, 509, 440, 410, 448, 704, 417, 147, 316 ],
        parallax: null
      }
    },
    template: `
    <section id="parallax-container">
        <div id="parallax-element" class="parallax-element"></div>
    </section>
    `,
    methods: {
      changePicture () {
        let num = Math.round( Math.random()*( this.pictures.length - 1 ) )
        this.parallax.style.backgroundImage =
            `url(https://picsum.photos/id/${this.pictures[ num ]}/1500/900)`
      },

      loopParallax () {
        if ( this.pictureCounter-- === 0 ) {
            this.pictureCounter = 600
            this.changePicture()
        }
        if ( this.moveCounter-- === 0 ) {
          this.moveCounter = 240
          let src = this.parallax.style.backgroundImage
          let position = [ "top", "left", "right", "bottom" ][ Math.round(Math.random()*3) ]
          this.parallax.style = `
              width: ${window.innerWidth * ( 1 + Math.random () * 0.5 )}px;
              height: ${window.innerHeight * ( 1 + Math.random () * 0.5 )}px;
              background-position: ${position};
              background-image: ${src};
          `
        }
        requestAnimationFrame ( this.loopParallax.bind(this) )
      }
    },
    mounted () {
      this.parallax = document.getElementById ( "parallax-element" )
      this.loopParallax ()
    }
})

export default Parallax
