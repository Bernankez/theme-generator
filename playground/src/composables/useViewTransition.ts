import type { Awaitable } from "@vueuse/core";

export function useViewTransition() {
  async function concentrate(x: number, y: number, updateCallback?: (classList: DOMTokenList) => Awaitable<void>) {
    if (document.startViewTransition) {
      const viewTransition = document.startViewTransition(async () => {
        await updateCallback?.(document.documentElement.classList);
      });

      await viewTransition.ready;

      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      );

      const clipPath = [
        `circle(${endRadius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 500,
          easing: "cubic-bezier(.16,.08,.25,1)",
          pseudoElement: "::view-transition-old(root)",
        },
      );
    } else {
      await updateCallback?.(document.documentElement.classList);
    }
  }

  async function diffuse(x: number, y: number, updateCallback?: (classList: DOMTokenList) => Awaitable<void>) {
    if (document.startViewTransition) {
      const viewTransition = document.startViewTransition(async () => {
        await updateCallback?.(document.documentElement.classList);
      });

      await viewTransition.ready;

      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      );

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 500,
          easing: "cubic-bezier(.16,.08,.25,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } else {
      await updateCallback?.(document.documentElement.classList);
    }
  }

  return {
    concentrate,
    diffuse,
  };
}
