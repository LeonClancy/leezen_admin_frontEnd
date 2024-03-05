// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    typescript: true,
    devtools: { enabled: true },
    app: {
        head: {
            title: 'Sakai Vue',
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/lara-light-indigo/theme.css'
                }
            ]
        }
    },
    modules: [
        'nuxt-primevue',
        '@vee-validate/nuxt',
        '@pinia/nuxt',
        'nuxt-vue3-google-signin'
    ],
    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
        }
    },
    googleSignIn:{
        clientId:process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
    }
});
