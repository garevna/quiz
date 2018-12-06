'use strict'

const JSCodeElement = {
  props: [ "text", "contenteditable" ],
	data: function () {
		return {
      classes: [
        "this",
        "function",
        "let ",
        "var ",
        "const ",
        "new ",
        "if ",
        "for ",
        "null",
        "NaN",
        "undefined",
        "false",
        "true",
        "Infinity",
        "Object",
        "Number",
        "Array",
        "Buffer",
        "Blob",
        "Boolean",
        "String",
        "Date",
        "Error",
        "Symbol",
        "prototype",
        "__proto__",
        "window",
        "document",
        "console",
        "localStorage",
        "cookie",
        "history",
        "fetch",
        "XMLHttpRequest",
        "File",
        "Promise",
        "Reader",
        "Request",
        "Response",
        "Headers",
        "URL",
        "JSON",
        "then",
        "try",
        "catch"
      ],
    }
  },
  computed: {
      jsText () {
          let tmp = this.text
          for ( let x of this.classes ) {
              tmp = this.setColor ( tmp, x )
          }
          return tmp
      }
  },
  methods: {
      setColor ( text, word ) {
          let expr = new RegExp( `\\b${word}`,`mg` )
          let newText = text.split ("\n").map (
              item => item.split ( expr )
                  .join ( `<span class="${word}">${word}</span>` )
          )
          newText = newText.join ("\n").split ( "=>" )
              .join ( `<span class="arrow">=></span>` )

          let literals = newText.match ( /`[\s\S][^`]*`/gmi )
          if ( literals )
            for ( let lit of literals ) {
              newText = newText.split ( lit )
                .join ( `<span class="literal">${lit}</span>` )
            }
          return newText
      },
      minify ( text ) {
          return text
            .split (/[\s]/gmi).join("")
            .split(String.fromCharCode(13)).join("")
            .split(String.fromCharCode(10)).join("")
            .split('<').join("&lt;")
            .split('>').join("&gt;")
      }
  },
  mounted () {
      this.$root.$on ( "validate-answer", function () {
          let tmp = this.$el.innerText.split ( /<[\s\S][^>]>/gmi ).join("")
          this.$emit ( "update:text", tmp )
      }.bind ( this ) )
  },
  template: `
      <code v-html = "jsText"
            :contenteditable = "contenteditable">
      </code>
  `
}

export default JSCodeElement
