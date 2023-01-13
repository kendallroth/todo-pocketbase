<template>
  <LayoutStack class="page-wrapper" :spacing="6">
    <h2 v-if="title" class="text-h5">
      {{ title }}
    </h2>
    <VCard class="page-layout">
      <slot name="default" />
    </VCard>
    <div v-if="$slots.append">
      <slot name="append" />
    </div>
  </LayoutStack>
</template>

<script lang="ts" setup>
import { LayoutStack } from "~components/layout";

type Props = {
  title?: string;
};

defineProps<Props>();
</script>

<style lang="scss" scoped>
.page-wrapper {
  align-items: center;
  flex-grow: 1;
  padding: 24px;
}

.page-layout {
  width: 100%;
  max-width: 600px;
}
</style>
