'use strict'

const JSCodeElement = {
  props: [ "text" ],
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
          return newText
      }
  },
  mounted () {

  },
  template: `
      <code v-html = "jsText"></code>
  `
}

export default JSCodeElement
