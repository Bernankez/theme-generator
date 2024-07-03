import { type Theme, defaultColors, defineTheme } from "@bernankez/theme-generator";
import { nanoid } from "nanoid";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useAppStore } from "./app";

export interface ThemeTemplate {
  version: number;
  name: string;
  cssPrefix?: string;
  theme: Theme;
}

export interface InternalThemeTemplate extends ThemeTemplate {
  _id: string;
  _removable?: boolean;
  _editable?: boolean;
}

export const useTemplateStore = defineStore("template", () => {
  const { configVersion } = storeToRefs(useAppStore());

  const customTemplates = ref<InternalThemeTemplate[]>([]);

  const builtInTemplates = ref<InternalThemeTemplate[]>([
    {
      _id: "shadcn",
      version: 0,
      name: "shadcn",
      theme: defineTheme({
        defaults: defaultColors,
      }),
    },
  ]);

  const templates = computed(() => [...customTemplates.value, ...builtInTemplates.value]);

  const currentId = ref<string>();
  const currentTemplate = computed({
    get() {
      const t = templates.value.find(t => t._id === currentId.value);
      if (!t) {
        return addDefaultTemplate();
      }
      return t;
    },
    set(template) {
      updateTemplate(template);
    },
  });

  function addTemplate(template: InternalThemeTemplate) {
    if (templates.value.findIndex(t => t._id === template._id) < 0) {
      customTemplates.value.push(template);
    }
  }

  function setCurrentTemplate(_id?: string) {
    currentId.value = _id;
  }

  function updateTemplate(template: InternalThemeTemplate) {
    for (const templates of [customTemplates, builtInTemplates]) {
      const index = templates.value.findIndex(t => t._id === template._id);
      if (index > -1) {
        const oldTemplate = templates.value[index];
        if (!oldTemplate._editable) {
          copyFromTemplate(oldTemplate);
          return;
        }
        templates.value.splice(index, 1, template);
        break;
      }
    }
  }

  function removeTemplate(_id: string) {
    let template: InternalThemeTemplate | undefined;
    let undo = () => {};
    for (const templates of [customTemplates, builtInTemplates]) {
      const index = templates.value.findIndex(t => t._id === _id);
      if (index > -1) {
        template = templates.value.splice(index, 1)[0];
        undo = () => {
          templates.value.splice(index, 0, template!);
          // TODO fix
          setCurrentTemplate(template!._id);
        };
        break;
      }
    }
    if (customTemplates.value.length > 0) {
      setCurrentTemplate(customTemplates.value.at(-1)!._id);
    }
    return {
      template,
      undo,
    };
  }

  function addDefaultTemplate(_id?: string) {
    _id = _id || nanoid();
    const theme = defineTheme({
      defaults: defaultColors,
    });
    const template: InternalThemeTemplate = {
      _id,
      version: configVersion.value,
      name: getDefaultTemplateName(),
      _editable: true,
      _removable: true,
      theme,
    };
    addTemplate(template);
    setCurrentTemplate(template._id);
    return template;
  }

  function copyFromTemplate(template: InternalThemeTemplate) {
    const _id = nanoid();
    const newTemplate: InternalThemeTemplate = {
      ...template,
      _id,
      name: getCopiedTemplateName(template.name),
      _editable: true,
      _removable: true,
    };
    addTemplate(newTemplate);
    setCurrentTemplate(newTemplate._id);
  }

  function getCopiedTemplateName(name: string) {
    let i: number | undefined;
    function getName() {
      return `${name} (copy${i ? ` ${i}` : ""})`;
    }
    while (templates.value.find(t => t.name === getName())) {
      if (!i) {
        i = 1;
      } else {
        i++;
      }
    }
    return getName();
  }

  function getDefaultTemplateName() {
    let i = 1;
    while (templates.value.find(t => t.name === `Theme_${i}`)) {
      i++;
    }
    return `Theme_${i}`;
  }

  return {
    currentId,
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
  };
}, {
  persist: {
    paths: ["currentId", "customTemplates"],
  },
});
