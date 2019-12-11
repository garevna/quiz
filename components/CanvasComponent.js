const Canvas = (
  "canvas-element", {
    props: [ "color", "width", "height", "imageURL", "text" ],
    data: function () {
      return {
        mode: "draw",
        canvas: document.getElementById ( "canvas" )
      }
    },
    computed: {
      mainSize () {
        return this.dimension ? Math.min ( ...this.dimension.split(",").map(item => Number( item.trim() ) ) ) : 100
      },
      imageWidth () {
        return this.width ? this.width <= 200 ? this.width : 200 : 100
      },
      imageHeight () {
        return this.height ? this.height <= 200 ? this.height : 200 : 100
      },
      canvasWidth () {
        return Math.min ( this.imageWidth * 2, 300 )
      },
      canvasHeight () {
        return Math.min ( this.imageHeight * 2, 300 )
      },
      offsetLeft () {
        return Math.round ( ( 300 - this.imageWidth ) / 2 )
      },
      offsetTop () {
        return Math.round ( ( 300 - this.imageHeight ) / 2 )
      }
    },
    template: `
      <figure style="width:300px;height:300px;">
        <img id="canvas-image" src="./images/js-icon.svg" style="display:none"/>
        <canvas id="canvas"
                :width="canvasWidth"
                :height="canvasHeight">
        </canvas>
      </figure>
      `,
    methods: {
      init () {
          this.canvas.style = `
              position: absolute;
              top: ${this.offsetTop}px;
              left:${this.offsetLeft}px;
          `
          this.createStaticPoints()
          this.canvas.points = []
          this.staticPoints.forEach (
              target => this.canvas.points.push (
                  new CanvasPoint ( this.canvas, this.ctx, target )
              )
          );

      },
      loop () {

          if ( this.mode ) {
              this.ctx.clearRect ( 0, 0, this.canvas.width, this.canvas.height )
              this[ this.mode ]()
          }


          requestAnimationFrame ( this.loop.bind ( this ) )
      },
      draw () {
          if ( this.mode !== "draw" ) return
          this.play = this.canvas.points.filter ( point => point.move () ).length
          this.mode = this.play ? "draw" : null
      },
      break () {
          if ( this.mode !== "break" ) return

          this.mode === "break" ?
              this.play = this.canvas.points
                  .filter ( point => point.break () ).length : null

          if ( !this.play ) {

              this.init()
              this.mode = "draw";
          }
      },
      createStaticPoints () {

          this.staticPoints = [];

          let color = getComputedStyle(document.documentElement)
              .getPropertyValue( '--primary' );

          this.ctx.clearRect ( 0, 0, this.canvas.width, this.canvas.height );
          let canvasImage = document.getElementById ( "canvas-image" )
          this.ctx.drawImage( canvasImage, 0, 0, this.width || 80, this.height || 80 );

          const imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height );
          let ctxData = imageData.data;

          for ( let point = 0; point < ctxData.length; point += 4 ) {
              if ( ctxData [ point ] || ctxData [ point + 1 ] || ctxData [ point + 2 ] ) {
                  this.staticPoints.push ({
                      x: Math.round ( ( point % ( this.canvas.width * 4 ) ) / 4 ),
                      y: Math.round ( point / ( this.canvas.width * 4 ) )
                  })
              }
          }
      },
      clickHandler () {
          
          if ( !this.canvas.points.length ) {
              this.init()
              this.mode =  "draw"
          } else this.mode = "break"

          this.loop()
      }
    },
    mounted: function () {
      this.canvas = document.getElementById ( "canvas" )
      this.canvas.style = `
          position: absolute;
          bottom: 10px;
          right:20px;
      `
      canvas.width = 250
      canvas.height = 200
      this.canvas.onclick = this.clickHandler

      this.canvas.maxDistance = Math.min ( this.canvas.width, this.canvas.height )
      this.canvas.points = []
      this.staticPoints = []

      this.ctx = this.canvas.getContext ( "2d" )
      this.staticText = this.text || ""
      this.init()
      this.loop()
    },
  }
)


class CanvasPoint {

    constructor ( canvas, ctx, target, color ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.target = target;
        this.color = color ? color.length === 4 ?
          color.slice(1).split("")
            .map( c => parseInt ( c, 16 ) * parseInt ( c, 16 ) ) :
              color.length === 7 ? [
                  parseInt ( color.slice(1,3), 16 ),
                  parseInt ( color.slice(3,5), 16 ),
                  parseInt ( color.slice(5,7), 16 )
              ] : this.colors [ Math.round ( Math.random() * ( this.colors.length - 1 ) ) ]
               : this.colors [ Math.round ( Math.random() * ( this.colors.length - 1 ) ) ]

        this.color[3] = 255

        Object.defineProperty ( this, "distance", {
            get () {
                return Math.round ( Math.sqrt (
                    Math.pow ( this.target.x - this.x, 2 ) +
                    Math.pow ( this.target.y - this.y, 2 )
                ))
            },
            set ( radius ) {

                this.color[3] = Math.round ( 255 * ( ( this.maxDistance - radius ) / this.maxDistance ) );

                let angle = ( Math.PI / 2 ) * Math.random() ;

                [ this.x, this.y ] = [
                    this.target.x + Math.round ( radius * Math.sin ( angle ) ),
                    this.target.y + Math.round ( radius * Math.cos ( angle ) )
                ];
            }
        })

        this.distance = this.maxDistance;
        this.draw();
    }

    move () {

        if ( !this.distance ) return this.draw();

        this.distance = Math.max (
            0,
            Math.round ( this.distance - this.velocity * Math.random () )
        );

        this.color[3] = Math.round ( 255 * ( ( this.maxDistance - this.distance ) / this.maxDistance ) );

        this.draw();

        return Boolean ( this.distance )
    }

    break () {

        let angle = ( Math.PI / 2 ) * Math.random();
        let radius = Math.round ( this.velocity * Math.random() );

        [ this.x, this.y ] = [
            this.x + Math.round ( radius * Math.sin ( angle ) ),
            this.y + Math.round ( radius * Math.cos ( angle ) )
        ];
        this.color[3] = Math.round ( 255 * ( ( this.maxDistance - this.distance ) / this.maxDistance ) );
        this.draw();
        return Math.max ( this.maxDistance - this.distance , 0 )
    }

    draw () {
        let imageData = this.ctx.getImageData ( this.x, this.y, 1, 1 )
        let point = imageData.data
        for ( var index = 0; index < 4; index++ )
            point [ index ] = this.color [ index ]
        this.ctx.putImageData( imageData, this.x, this.y )
    }
}

CanvasPoint.prototype.colors = [
    [ 255,   0, 255, 255 ],
    [ 130, 255, 130, 255 ],
    [ 255,  90,   0, 255 ],
    [   0, 150, 200, 255 ],
    [ 255, 255, 170, 255 ]
];

CanvasPoint.prototype.velocity = 4;

Object.defineProperty ( CanvasPoint.prototype, "maxDistance", {
    get () {
        return Math.round ( Math.min ( this.canvas.width * 0.5, this.canvas.height * 0.5 ) )
    }
})


export default Canvas
