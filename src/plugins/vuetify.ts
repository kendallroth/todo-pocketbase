import { createVuetify, type ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import "vuetify/styles";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#f9f9f9",
  },
};

export const vuetifyPlugin = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
    },
  },
});
