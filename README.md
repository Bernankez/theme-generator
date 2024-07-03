# 🌈 theme-generator

Choose a color scheme for your website.

You can visit [theme-generator](https://theme-generator.keke.cc) to get a real-time preview.

## Features

- Config different colors for light and dark mode.
- Real-time preview of theme effects.
- Auto generate theme via a primary color.
- Support exporting as CSS variables, UnoCSS or TailwindCSS config.
- Color tokens for different UI frameworks adaptation. (WIP)
- Provide API usage.

## API Usage

> [!WARNING]
> The API is still unstable and may have breaking change in the future.

### Install

```sh
npm i @bernankez/theme-generator
```

In your project

```ts
import { defaultColors, defineTheme } from "@bernankez/theme-generator";

const theme = defineTheme({
  defaults: defaultColors
});

console.log(theme);
// {
//   colors: {
//     background: {
//       light: "#ffffff",
//       dark: "#0a0a0a"
//     },
//     foreground: {
//       light: "#0a0a0a",
//       dark: "#fafafa"
//     },
//     primary: {
//       light: "#171717",
//       dark: "#fafafa"
//     },
//     primaryForeground: {
//       light: "#fafafa",
//       dark: "#171717"
//     },
//     secondary: {
//       light: "#f5f5f5",
//       dark: "#262626"
//     },
//     secondaryForeground: {
//       light: "#171717",
//       dark: "#fafafa"
//     },
//     accent: {
//       light: "#f5f5f5",
//       dark: "#262626"
//     },
//     accentForeground: {
//       light: "#171717",
//       dark: "#fafafa"
//     },
//     muted: {
//       light: "#f5f5f5",
//       dark: "#262626"
//     },
//     mutedForeground: {
//       light: "#737373",
//       dark: "#fafafa"
//     },
//     info: {
//       light: "#00b3f0",
//       dark: "#00b3f0"
//     },
//     infoForeground: {
//       light: "#000000",
//       dark: "#000000"
//     },
//     success: {
//       light: "#00a96f",
//       dark: "#00a96f"
//     },
//     successForeground: {
//       light: "#000000",
//       dark: "#000000"
//     },
//     warning: {
//       light: "#ffc22d",
//       dark: "#ffc22d"
//     },
//     warningForeground: {
//       light: "#000000",
//       dark: "#000000"
//     },
//     error: {
//       light: "#ff6f70",
//       dark: "#ff6f70"
//     },
//     errorForeground: {
//       light: "#000000",
//       dark: "#000000"
//     }
//   },
//   radius: "0.5rem"
// };
```

`defaultColors` is the `Neutral` theme of `shadcn`, you can also pass your own color variables, and the remaining variables will be merged with `defaultColors`. The values in `overrides` have a higher priority than those in `defaults`.

### defineTheme

The function of defining themes. You can pass in your own color variables, or use the built-in `defaultColors` as defaults. You can also use `inferThemeFromColor` below to generate a theme as `defaults`.

```ts
export declare function defineTheme(options: DefineThemeOptions): Theme;

export interface DefineThemeOptions {
  defaults: AcceptableTheme;
  overrides?: Partial<AcceptableTheme>;
}

export type AcceptableTheme = {
  colors: Partial<Record<ColorKeywords, Color | string>>;
} & {
  [key in ShapeKeywords]?: string
};

export type Theme = {
  colors: Record<ColorKeywords, Color>;
} & {
  [key in ShapeKeywords]: string;
};
```

### inferThemeFromColor

Auto generate a theme from a primary color.

```ts
export declare function inferThemeFromColor(themeColor: string): Theme;
```

### Preset

`@bernankez/theme-generator` adapts to different UI frameworks through presets. It currently exports `presetNone` and `presetShadcn`. You can adapt your own UI framework through preset.

#### presetNone

```ts
export declare function presetNone(theme: Theme, options?: PresetNoneOptions): { theme: Theme; style: { light: Record<string, string>; dark: Record<string, string> }; unocss: Theme; tailwind: TailwindTheme };

export interface PresetNoneOptions {
  cssPrefix?: string;
}
```

#### presetShadcn

```ts
export declare function presetShadcn(theme: Theme, options?: PresetShadcnOptions): { theme: ShadcnTheme; style: { light: Record<string, string>; dark: Record<string, string> }; unocss: Theme; tailwind: TailwindTheme };

export interface PresetShadcnOptions {
  cssPrefix?: string;
}
```

## Thanks

This project is inspired by

- [prism-theme-vars](https://github.com/antfu/prism-theme-vars)
- [Realtime Colors](https://www.realtimecolors.com)

## License

[MIT](LICENSE) License © [科科Cole](https://github.com/Bernankez)

## Roadmap

https://github.com/Bernankez/theme-generator/issues/1
