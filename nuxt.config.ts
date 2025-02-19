// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
    devtools: { enabled: false },
    app: {
        head: {
          title: 'testing', // Set your website name here
          meta: [
            { name: 'description', content: 'Description of your website' },
            // Add other meta tags as needed
          ],
        },
      },
    css: ['@/assets/css/global.css'],
    modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module"],
    primevue: {
        options: {
            ripple: true,
            inputVariant: 'filled',
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'light',
                    cssLayer: false
                }
            }
        }
    }
});
