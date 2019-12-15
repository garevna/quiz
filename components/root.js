export default {
  data () {
    return {
      mainDataSource: "data/mainData.json",
      drawer: null,
      startQuiz: false,
      level: 1,
      mainQuizData: null,
      quizResults: {
          score: 0,
          lives: 0,
          maxScore:0
      },
      sign_in_process: false,
      sign_up_process: false,
      showInfo: false,
      winHeight: window.innerHeight,
      winWidth: window.innerWidth,
    }
  },

  computed: {
      login () { return this.$store.state.userInfo.login },
      userName () { return this.$store.state.userInfo.name },
      userFname () { return this.$store.state.userInfo.fname },
      userPhotoURL () { return this.$store.state.userInfo.photoURL },
      userRegistered () { return this.$store.state.userInfo.registered },
      mainMenuReady () { return this.$store.getters.mainMenuReady },
      mainMenuItems () { return this.$store.getters.mainMenuItems },
      quizReady () { return this.$store.state.quizReady },
      showFooter () { return !this.startQuiz && this.winHeight > 700 },
      showSVG () {
        return !this.showInfo && !this.sign_in_process && !this.sign_up_process && !this.startQuiz
      }
  },

  mounted () {

    this.getMainData()
        .then (
          response => null,
          error => console.warn ( "Something wrong...", error )
        )

    let folderName = decodeURI ( location.hash ).slice(1).trim()



    this.$on ( 'start-quiz', function ( val ) {
        !this.login ? this.sign_in_process = true : this.startQuiz = true
    })

    this.$on ( 'exit-quiz', function () {
        location.hash = ""
        this.startQuiz = false
    })

    this.$on ( 'closeNavigationPanel', function () {
        this.drawer = false
    })

    this.$on ( 'close-info', function () {
      this.showInfo = false
    })

    this.$on ( 'navigation-drawer-state', function ( val ) {
        this.drawer = val
    })

    this.$on ( 'sign-in-finished', function () {
        this.sign_in_process = false

    })

    this.$on ( 'sign-up-finished', function () {
        this.sign_up_process = false
    })

    // this.$vuetify.theme = {
    //     primary: '#234',
    //     secondary: '#fa0',
    //     accent: '#f50',
    //     error: '#d00',
    //     info: '#09b',
    //     success: '#050',
    //     warning: '#fa0',
    //     codeSection: "#00000000"
    // }

    this.getCookies ()
        .then ( () => this.sign_in_process = !this.login ? true : false )
    this.windowResized ()
  },

  created () {

  },

  methods: {

    async getMainData () {
      let response = await ( await fetch ( this.mainDataSource ) ).json()
      if ( response ) {
          this.$store.commit ( 'setMainData', response )
          let __hash = decodeURI ( location.hash ).slice(1).trim()
          __hash ? this.getQuizData ( __hash ) : null
          return "success"
      } else return 'Error reading the main data file '
    },

    async getQuizData ( theme ) {

        if ( theme ) {
            let ___data = this.$store.state.mainData
                        .find ( x => x.folder === theme )
            this.$store.commit ( 'setQuizName', theme )
            await this.$store.dispatch ( 'getQuizData', {
                folder: ___data.folder,
                files: ___data.levels
            })
            this.startQuiz = true
        }
    },

    async getCookies () {

        let login = Object.assign ( {}, ...document.cookie.split ( "; " )
            .map ( item => item.split ( "=" ) )
                .map (
                    item => Object.assign (
                        {}, { [ item[0] ] : item [1] }
                    )
                )
        ).user

        if ( !login ) this.$store.commit( "breakUser" )

        let response = await this.$store.dispatch ( "getUserInfo", login )

        if ( response.error ) this.$store.commit( "breakUser" )
    },

    windowResized () {
      this.winHeight = window.innerHeight
      this.winWidth = window.innerWidth
    }
  },
}
