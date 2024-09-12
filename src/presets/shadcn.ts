import { n } from "@bernankez/utils";
import { type Color, type ColorKeywords, type Theme, hexToHsl, transformStyle, transformTailwind, transformUnoCSS } from "..";

export interface PresetShadcnOptions {
  cssPrefix?: string;
}

const shadcnColorKeywords = n([
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "border",
  "input",
  "ring",
  "info",
  "infoForeground",
  "success",
  "successForeground",
  "warning",
  "warningForeground",
  "error",
  "errorForeground",
]);

const shadcnShapeKeywords = n([
  "radius",
]);

export type ShadcnColorKeywords = typeof shadcnColorKeywords[number];

export type ShadcnShapeKeywords = typeof shadcnShapeKeywords[number];

export type ShadcnTheme = {
  colors: Record<ShadcnColorKeywords, Color>;
} & {
  [Key in ShadcnShapeKeywords]: string;
};

function transformTheme(theme: Theme): ShadcnTheme {
  const shadcnTheme = {
    colors: {},
  } as ShadcnTheme;

  for (const color in theme.colors) {
    if (shadcnColorKeywords.includes(color as ColorKeywords)) {
      shadcnTheme.colors[color as ShadcnColorKeywords] = theme.colors[color as ColorKeywords];
    }
  }

  shadcnTheme.colors.card = theme.colors.background;
  shadcnTheme.colors.cardForeground = theme.colors.foreground;
  shadcnTheme.colors.popover = theme.colors.background;
  shadcnTheme.colors.popoverForeground = theme.colors.foreground;
  shadcnTheme.colors.destructive = theme.colors.error;
  shadcnTheme.colors.destructiveForeground = theme.colors.errorForeground;
  shadcnTheme.colors.border = theme.colors.border;
  shadcnTheme.colors.input = theme.colors.border;
  shadcnTheme.colors.ring = theme.colors.primary;
  shadcnTheme.colors.info = theme.colors.info;
  shadcnTheme.colors.infoForeground = theme.colors.infoForeground;
  shadcnTheme.colors.success = theme.colors.success;
  shadcnTheme.colors.successForeground = theme.colors.successForeground;
  shadcnTheme.colors.warning = theme.colors.warning;
  shadcnTheme.colors.warningForeground = theme.colors.warningForeground;
  shadcnTheme.colors.error = theme.colors.error;
  shadcnTheme.colors.errorForeground = theme.colors.errorForeground;
  shadcnTheme.radius = theme.radius;

  return shadcnTheme;
}

function handlePercent(num: number) {
  return num.toFixed(1).replace(".0", "");
}

export function presetShadcn(theme: Theme, options?: PresetShadcnOptions) {
  const { cssPrefix } = options || {};
  const transformedTheme = transformTheme(theme);
  const style = transformStyle(transformedTheme, {
    ...options,
    resolve: (key, scheme) => {
      if (Object.hasOwn(transformedTheme.colors, key)) {
        const hsl = hexToHsl(transformedTheme.colors[key as keyof typeof transformedTheme.colors][scheme]);
        if (typeof hsl === "string") {
          return hsl;
        }
        const [h, s, l] = hsl;
        return `${handlePercent(h)} ${handlePercent(s * 100)}% ${handlePercent(l * 100)}%`;
      }
    },
  });
  const unocss = transformUnoCSS(transformedTheme, {
    ...options,
    colorSpace: "hsl",
    resolve: (key) => {
      if (key === "radius") {
        return {
          borderRadius: {
            lg: `var(--${cssPrefix ? `${cssPrefix}-` : ""}radius)`,
            md: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 2px)`,
            sm: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 4px)`,
          },
        };
      }
    },
  });
  const tailwind = transformTailwind(transformedTheme, {
    ...options,
    colorSpace: "hsl",
    resolve: (key) => {
      if (key === "radius") {
        return {
          borderRadius: {
            lg: `var(--${cssPrefix ? `${cssPrefix}-` : ""}radius)`,
            md: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 2px)`,
            sm: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 4px)`,
          },
        };
      }
    },
  });
  return {
    theme: transformedTheme,
    style,
    unocss,
    tailwind,
  };
}
