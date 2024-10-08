import { type MaybeRefOrGetter, computed, shallowRef, toValue } from "vue";
import { type BundledLanguage, type BundledTheme, type HighlighterGeneric, bundledLanguages, getHighlighter } from "shiki/bundle/web";

const highlighter = shallowRef<HighlighterGeneric<BundledLanguage, BundledTheme>>();
export function useHighlighter() {
  async function init() {
    if (highlighter.value) {
      return;
    }
    highlighter.value = await getHighlighter({
      langs: Object.keys(bundledLanguages),
      themes: ["vitesse-dark", "vitesse-light"],
    });
  }

  init();

  function codeToHtml(code: MaybeRefOrGetter<string | undefined>, lang: MaybeRefOrGetter<string | undefined>) {
    return computed(() => {
      if (!toValue(code)) {
        return "";
      }
      if (!highlighter.value) {
        return `<pre>${toValue(code)}</pre>`;
      }
      return highlighter.value.codeToHtml(toValue(code)!, {
        lang: toValue(lang) || "",
        theme: "vitesse-light",
        // theme: isDark.value ? "vitesse-dark" : "vitesse-light",
      });
    });
  }

  return {
    highlighter,
    codeToHtml,
  };
}
