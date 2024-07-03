import { storeToRefs } from "pinia";
import { useClipboard, useFileDialog } from "@vueuse/core";
import { nanoid } from "nanoid";
import { push } from "notivue";
import { type InternalThemeTemplate, type ThemeTemplate, useTemplateStore } from "../store/template";
import { download } from "../shared/utils";

export function useTemplate() {
  const templateStore = useTemplateStore();
  const { addTemplate, setCurrentTemplate, removeTemplate, updateTemplate, addDefaultTemplate, copyFromTemplate } = templateStore;
  const { templates, customTemplates, builtInTemplates, currentTemplate } = storeToRefs(templateStore);

  const { copy } = useClipboard();

  const { open, onChange, reset } = useFileDialog({
    accept: "application/json",
  });

  let hook: ((config: InternalThemeTemplate) => void) | undefined;

  function importTemplateFromJson(fn?: (template: InternalThemeTemplate) => void) {
    if (typeof fn === "function") {
      hook = fn;
    }
    open();
  }

  onChange((fileList) => {
    if (!fileList) {
      return;
    }
    if (fileList[0].type !== "application/json") {
      push.error({
        message: "Please select a valid JSON file",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const template = JSON.parse(e.target?.result as string) as ThemeTemplate;
        const _id = nanoid();
        const internalTemplate: InternalThemeTemplate = {
          ...template,
          _id,
          _removable: true,
          _editable: true,
        };
        hook?.(internalTemplate);
        addTemplate(internalTemplate);
        setCurrentTemplate(internalTemplate._id);
        push.success({
          message: `Successfully imported ${internalTemplate.name}`,
        });
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(fileList[0]);
    reset();
  });

  function exportTemplateToJson(template: InternalThemeTemplate) {
    const { _id, _removable, _editable, ..._template } = template;
    const file = new Blob([JSON.stringify(_template, null, 2)], { type: "application/json" });
    const name = `${template.name}.json`;
    download(file, name);
  }

  function importTemplateFromLink(template: Omit<InternalThemeTemplate, "_id" | "_removable" | "_editable">) {
    const _id = nanoid();
    addTemplate({
      _id,
      ...template,
      _editable: true,
      _removable: true,
    });
    setCurrentTemplate(_id);
    push.success({
      message: `Successfully imported ${template.name}`,
    });
  }

  async function exportTemplateToLink(template: InternalThemeTemplate) {
    const { _id, _removable, _editable, ..._template } = template;
    const url = new URL(location.href);
    url.searchParams.set("template", JSON.stringify(_template));
    await copy(url.toString());
    push.success({
      message: "Link copied to clipboard",
    });
  }

  return {
    currentTemplate,
    templates,
    customTemplates,
    builtInTemplates,

    addTemplate,
    removeTemplate,
    updateTemplate,
    addDefaultTemplate,
    copyFromTemplate,
    setCurrentTemplate,

    importTemplateFromJson,
    exportTemplateToJson,
    importTemplateFromLink,
    exportTemplateToLink,
  };
}
