const UserInfo = {

    props: [ "showInfo" ],

    data () {
        return {
            frame: null,
            elems: [],
            container: null
	      }
    },

    computed: {
        user () {
            return this.$root.$store.state.userInfo
        },
        resultsHeaders () {
            return Object.keys( this.$root.$store.state.userResults )
        },
        results () {
          return Object.values (
              this.$root.$store.state.userResults
          )
        },
    },

    methods: {

        closeInfo () {
            this.$root.$emit ( 'close-info' )
        },

        handleScroll () {
            if ( !this.frame || !this.elems || !this.elems.length ) return
            this.elems.forEach ( el => {
                  let rect = el.getBoundingClientRect()
                  if ( rect.top >= this.frame.top && rect.bottom <= this.frame.bottom )
                    el.setAttribute( "style", "opacity: 1; transform: translate3d( 10px, 0, 0)")
                  else el.setAttribute( "style", "opacity: 0; transform: translate3d( -300px, 0, 0)")
            })
        },

        winResize () {
            this.frame = this.container ? this.container.getBoundingClientRect() : this.frame
        }
    },

    mounted () {
        window.addEventListener ( "resize", this.winResize )
        console.clear()
    },
    updated () {
        this.container = document.getElementById ( "garevna-scroll-container" )
        this.elems = Array.from ( document.getElementsByClassName ( "scrolled-from-left" ) )

        if ( this.container ) {
            this.winResize ()
            this.container.addEventListener ( "scroll", this.handleScroll.bind ( this ) )
            this.handleScroll()
        }
    },

    beforeDestroy () {
      window.removeEventListener ( "resize", this.winResize )
      this.container.removeEventListener ( "scroll", this.winScroll )
      console.clear()
    },

    template: `
       <div v-if="showInfo" class="transparent" style="position: fixed; top: 20%; bottom: 10%; left:10%; right: 10%; overflow:hidden">
         <div class="scroll-container" id="garevna-scroll-container">
          <div class="scrolled-from-left"

               v-for = "( item, index ) in resultsHeaders">
               <h3 class = "warning--text">
                     {{item}}
               </h3>
               <p v-for = "( attempt, ind ) in results[index]"
                            :key="ind">
                 <v-icon>star_circle</v-icon>
                  {{attempt}}
               </p>

          </div>
        </div>

        <v-card-actions style="position: absolute; top: -10px; right: 0; background: #00000070; padding: 8px 0 0 0;">
            <v-spacer></v-spacer>
            <v-btn text dark
                   @click.native="closeInfo">
                   Close
            </v-btn>
        </v-card-actions>
      </div>
    `
}

export default UserInfo
