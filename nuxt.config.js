
export default {
  head: {
    title: 'BattleBlox | A challenging turn based strategy game',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=0.7, maximum-scale=0.7, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Play our free turn based strategy game and conquer the map!' || '' }
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
    '@nuxtjs/pwa',
    'nuxt-webfontloader'
  ],

  webfontloader: {
    google: {
      families: ['Alegreya Sans SC:400,400&display=swap']
    }
  },

  server: {
    host: '0.0.0.0'
  }
}
