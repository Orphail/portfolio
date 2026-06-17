import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), vue(), icon()],
  resolveJsonModule: true
});
