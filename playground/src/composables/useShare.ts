import { useClipboard } from "@vueuse/core";
import { push } from "notivue";
import type { Theme } from "@bernankez/theme-generator";

export function useShare() {
  const { copy } = useClipboard();

  async function share(theme: Theme) {
    const _theme = JSON.stringify(theme);
    const url = `${location.origin}?theme=${encodeURIComponent(_theme)}`;
    await copy(url);
    push.success({
      duration: 5000,
      message: "Share link copied to clipboard",
    });
  }

  function parse(): Theme | undefined {
    const params = new URLSearchParams(location.search);
    const theme = params.get("theme");
    if (theme) {
      return JSON.parse(decodeURIComponent(theme));
    }
  }

  return {
    share,
    parse,
  };
}
