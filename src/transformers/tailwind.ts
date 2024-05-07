export interface TransformTailwindOptions {
  /**
   * @default "tw"
   */
  prefix?: string;
}

export function transformTailwind(options?: TransformTailwindOptions) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { prefix = "tw" } = options || {};

  return () => ({
    tailwind: {
    },
  });
}
