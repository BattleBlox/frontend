
export default {
  head: {
    title: 'BattleBlox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  components: true,

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  loading: { color: '#fff' },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/components'
  ],

  plugins: [
    '~/plugins/fontawesome.plugin.js'
  ],

  modules: [
    '@nuxtjs/pwa'
  ],

  server: {
    host: '0.0.0.0'
  }
}
