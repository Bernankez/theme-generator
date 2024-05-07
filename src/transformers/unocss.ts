export interface TransformUnoCSSOptions {
  /**
   * @default "un"
   */
  prefix?: string;
}

export function transformUnoCSS(options?: TransformUnoCSSOptions) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { prefix = "un" } = options || {};

  return () => ({
    unocss: {
    },
  });
}
