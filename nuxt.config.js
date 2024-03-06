// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
        },
    },
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
    runtimeConfig: {
        public: {
            apiBaseUrl: 'http://172.105.204.235/api',
        }
    },
    googleSignIn: {
        clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
    }
});
