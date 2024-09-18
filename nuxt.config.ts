// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
     baseURL: "/dream-project/"
  },
  modules: ['@hypernym/nuxt-gsap'],
  ssr: false, //When false
  target: "static" // and static, nuxt generates a SPA

})
