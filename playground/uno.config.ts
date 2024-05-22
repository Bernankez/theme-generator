import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  transformers: [transformerDirectives()],
  preflights: [{
    getCSS: () => `:root {
  --background: 255 255 255;
  --foreground: 10 10 10;
  --primary: 23 23 23;
  --primary-foreground: 250 250 250;
  --secondary: 245 245 245;
  --secondary-foreground: 23 23 23;
  --accent: 245 245 245;
  --accent-foreground: 23 23 23;
  --muted: 245 245 245;
  --muted-foreground: 115 115 115;
  --info: 0 179 240;
  --info-foreground: 0 0 0;
  --success: 0 169 111;
  --success-foreground: 0 0 0;
  --warning: 255 194 45;
  --warning-foreground: 0 0 0;
  --error: 255 111 112;
  --error-foreground: 0 0 0;
  --radius: 0.5rem;
  }

:root .dark {
  --background: 10 10 10;
  --foreground: 250 250 250;
  --primary: 250 250 250;
  --primary-foreground: 23 23 23;
  --secondary: 38 38 38;
  --secondary-foreground: 250 250 250;
  --accent: 38 38 38;
  --accent-foreground: 250 250 250;
  --muted: 38 38 38;
  --muted-foreground: 250 250 250;
  --info: 0 179 240;
  --info-foreground: 0 0 0;
  --success: 0 169 111;
  --success-foreground: 0 0 0;
  --warning: 255 194 45;
  --warning-foreground: 0 0 0;
  --error: 255 111 112;
  --error-foreground: 0 0 0;
}`,
  }],
  theme: {
    colors: {
      background: "rgb(var(--background))",
      foreground: "rgb(var(--foreground))",
      primary: {
        DEFAULT: "rgb(var(--primary))",
        foreground: "rgb(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "rgb(var(--secondary))",
        foreground: "rgb(var(--secondary-foreground))",
      },
      accent: {
        DEFAULT: "rgb(var(--accent))",
        foreground: "rgb(var(--accent-foreground))",
      },
      muted: {
        DEFAULT: "rgb(var(--muted))",
        foreground: "rgb(var(--muted-foreground))",
      },
      info: {
        DEFAULT: "rgb(var(--info))",
        foreground: "rgb(var(--info-foreground))",
      },
      success: {
        DEFAULT: "rgb(var(--success))",
        foreground: "rgb(var(--success-foreground))",
      },
      warning: {
        DEFAULT: "rgb(var(--warning))",
        foreground: "rgb(var(--warning-foreground))",
      },
      error: {
        DEFAULT: "rgb(var(--error))",
        foreground: "rgb(var(--error-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
  },
});
