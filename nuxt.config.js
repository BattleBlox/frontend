
export default {
  target: 'static',

  head: {
    title: 'BattleBlox | A challenging turn based strategy game',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Play BattleBlox online | A challenging turn based strategy game where you aim to conquer the map!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  components: true,

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    './styles/animations.scss',
    './styles/colours.scss',
    './styles/utilities.scss'
  ],

  loading: { color: '#fff' },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/components'
  ],

  plugins: [
    '~/plugins/fontAwesome.plugin.js',
    '~/plugins/persistState.plugin.client.js',
    '~/plugins/statistics.client.js'
  ],

  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader'
  ],

  pwa: {
    manifest: {
      name: 'BattleBlox',
      short_name: 'BattleBlox',
      description: 'Play BattleBlox online | A challenging turn based strategy game where you aim to conquer the map!',
      lang: 'en',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000'
    }
  },

  webfontloader: {
    google: {
      families: ['Alegreya Sans SC:400,400&display=swap']
    }
  },

  server: {
    host: '0.0.0.0'
  }
}
