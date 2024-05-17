import { n } from "@bernankez/utils";
import { type Color, type Theme, hexToHsl, transformStyle, transformTailwind, transformUnoCSS } from "..";

export interface ShadcnPresetOptions {
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
    if (shadcnColorKeywords.includes(color as any)) {
      shadcnTheme.colors[color as ShadcnColorKeywords] = theme.colors[color as keyof typeof theme.colors];
    }
  }

  shadcnTheme.colors.card = theme.colors.primary;
  shadcnTheme.colors.cardForeground = theme.colors.primaryForeground;
  shadcnTheme.colors.popover = theme.colors.primary;
  shadcnTheme.colors.popoverForeground = theme.colors.primaryForeground;
  shadcnTheme.colors.destructive = theme.colors.error;
  shadcnTheme.colors.destructiveForeground = theme.colors.errorForeground;
  shadcnTheme.colors.border = theme.colors.primary;
  shadcnTheme.colors.input = theme.colors.primary;
  shadcnTheme.colors.ring = theme.colors.primary;
  shadcnTheme.radius = theme.radius;

  return shadcnTheme;
}

function handlePercent(num: number) {
  return num.toFixed(1).replace(".0", "");
}

export function shadcnPreset(theme: Theme, options?: ShadcnPresetOptions) {
  const { cssPrefix } = options || {};
  const transformedTheme = transformTheme(theme);
  const style = transformStyle(transformedTheme, {
    ...options,
    resolve: (key, scheme) => {
      if (Object.hasOwn(transformedTheme.colors, key)) {
        const { h, s, l } = hexToHsl(transformedTheme.colors[key as keyof typeof transformedTheme.colors][scheme]);
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
