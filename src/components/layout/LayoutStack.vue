<template>
  <component :is="is" class="layout-stack" :class="{ 'is-row': direction === 'row' }">
    <slot />
  </component>
</template>

<script lang="ts" setup>
type FlexAlignment = "center" | "flex-start" | "flex-end" | "stretch";

type LayoutStackProps = {
  alignItems?: FlexAlignment;
  direction?: "row" | "column";
  /** Custom component type (ie. 'form') */
  is?: string;
  justifyContent?: FlexAlignment;
  /** Spacing between items (4px increments) */
  spacing?: number;
};

withDefaults(defineProps<LayoutStackProps>(), {
  alignItems: "flex-start",
  direction: "column",
  is: "div",
  justifyContent: "flex-start",
  spacing: 2,
});
</script>

<style lang="scss" scoped>
.layout-stack {
  display: flex;
  flex-direction: v-bind(direction);
  align-items: v-bind(alignItems);
  justify-content: v-bind(justifyContent);
  gap: calc(v-bind(spacing) * 4px);
}
</style>
