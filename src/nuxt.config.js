
export default {
  head: {
    title: 'Online Empires',
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

  loading: { color: '#fff' },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/components'
  ],

  modules: [
    '@nuxtjs/pwa'
  ]
}
