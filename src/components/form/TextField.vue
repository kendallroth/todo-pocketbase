<template>
  <VTextField
    v-bind="$attrs"
    density="comfortable"
    :disabled="disabled"
    :error="Boolean(error)"
    :hint="error ?? hint"
    :label="label"
    :model-value="inputValue"
    persistent-hint
    @blur="handleBlur"
    @update:model-value="handleChange"
  />
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { computed } from "vue";

type TextFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
  /** Initial field value */
  value?: string;
};

const props = withDefaults(defineProps<TextFieldProps>(), {
  disabled: false,
  hint: "",
  label: undefined,
  value: "",
});

const {
  value: inputValue,
  errorMessage: rawError,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});

const error = computed(() => {
  if (!meta.touched || !rawError.value) return;
  if (typeof rawError.value === "string") return rawError.value;

  // const { key, values } = rawError.value;
  // return typeof rawError.value === "string" ? rawError.value : t(key, values);
  return "Unknown error structure";
});
</script>
