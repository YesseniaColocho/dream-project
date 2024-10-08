// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
     baseURL: "/dream-project/"
  },
  modules: ['@hypernym/nuxt-gsap'],
  generate:{
    nojekyll: true, //not working on this version
    fallback: '404.html',
  },
  generator:{
    nojekyll:true
  },
  ssr: false, //When false
  target: "static", // 

})
