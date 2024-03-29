// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new VuetifyLoaderPlugin()
//     ]
//   }
// }

module.exports = {
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      match (originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }])
  }
}
