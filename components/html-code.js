'use strict'

const htmlCodeElement = {
  props: [ "text" ],
	data: function () {
		return {
        attrs: [
            "width",
            "height",
            "src",
            "href",
            "for",
            "onchange",
            "onclick",
            "oninput",
            "id",
            "value",
            "contenteditable",
            "disabled",
            "download",
            "enctype",
            "hidden",
            "integrity",
            "placeholder",
            "target",
            "title",
            "type",
            "wrap",
            "rows",
            "rowspan"
        ],
    }
  },
  computed: {
      htmlText () {
          return this.coloringHTML ( this.text )
      }
  },
  methods: {
    coloringHTML ( text ) {
        let matches = text.match ( /<[^\s^>]*[\/]*[>]*/gim )
        let strings = text.match ( /(['"])[^\s]*?\1/gim )
        if ( !matches ) return text
        let newHTML = text
          .split ( "class" )
            .join ( `_____` )
        for ( let m of matches ) {
            newHTML = newHTML.split ( m )
              .join ( `<span class="tag">${m.replace("<","&lt;")}</span>` )
        }
        for ( let x of this.attrs ) {
          newHTML = newHTML.split ( x )
            .join ( `<span class="attr">${x}</span>` )
        }
        if ( strings )
          for ( let x of strings ) {
            newHTML = newHTML.split ( x )
              .join ( `<span class="values">${x}</span>` )
          }
        newHTML = newHTML.split ( "_____" )
            .join ( `<span class="attr">class</span>` )
        return newHTML
    }
  },
  mounted () {

  },
  template: `
      <code v-html = "htmlText"></code>
  `
}

export default htmlCodeElement
