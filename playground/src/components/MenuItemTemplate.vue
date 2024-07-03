<script setup lang="ts">
import { push } from "notivue";
import type { ComponentPublicInstance } from "vue";
import { computed, inject, ref, watchEffect } from "vue";
import MenuItem from "./ui/MenuItem.vue";
import Button from "./ui/Button.vue";
import Input from "./ui/Input.vue";
import { editIdKey } from "./injection-keys";
import type { InternalThemeTemplate } from "@/store/template";
import { useTemplate } from "@/composables/useTemplate";

const template = defineModel<InternalThemeTemplate>("template", {
  required: true,
});

const { currentTemplate, setCurrentTemplate, removeTemplate, copyFromTemplate, exportTemplateToLink } = useTemplate();

const editId = inject(editIdKey, ref());

const isEdit = computed({
  get: () => template.value._id === editId.value,
  set(edit) {
    editId.value = edit ? template.value._id : undefined;
  },
});
const inputRef = ref<ComponentPublicInstance>();

watchEffect(() => {
  if (isEdit.value) {
    inputRef.value?.$el.focus();
  }
});

function deleteTemplate() {
  const { template: _t, undo } = removeTemplate(template.value._id);
  if (_t) {
    push.success({
      message: `Template ${_t.name} deleted`,
      duration: 3000,
      props: {
        undoFn: undo,
      },
    });
  }
}

function copyTemplate() {
  copyFromTemplate(template.value);
}

function editTemplate() {
  isEdit.value = true;
}
</script>

<template>
  <MenuItem :auto-collapse="false" :active="currentTemplate?._id === template._id || undefined" :title="template.name" @click="setCurrentTemplate(template._id)" @keydown.stop>
    <Input v-if="isEdit" ref="inputRef" v-model="template.name" class="w-40" @click.stop @keydown.enter.stop="isEdit = false" />
    <span v-else class="truncate" :title="template.name">
      {{ template.name }}
    </span>
    <div class="ml-auto flex">
      <template v-if="isEdit">
        <Button icon="i-lucide:check" title="Confirm" @click.stop="isEdit = false" />
      </template>
      <template v-else>
        <Button v-if="template._editable" icon="i-lucide:edit-3" title="Edit" @click.stop="editTemplate" />
        <Button icon="i-lucide:copy-plus" title="Copy" @click.stop="copyTemplate" />
        <Button v-if="template._editable" icon="i-lucide:share-2" title="Share" @click.stop="() => exportTemplateToLink(template)" />
        <Button v-if="template._removable" icon="i-lucide:trash-2 text-error" title="Delete" @click.stop="deleteTemplate" />
      </template>
    </div>
  </MenuItem>
</template>
