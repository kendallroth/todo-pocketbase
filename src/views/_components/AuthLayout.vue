<template>
  <PageLayout>
    <VCardTitle class="text-center">{{ title }}</VCardTitle>
    <VCardText class="pa-6">
      <slot name="default" />
    </VCardText>
    <template #append v-if="$slots.append">
      <slot name="append" />
    </template>
  </PageLayout>
</template>

<script lang="ts" setup>
import PageLayout from "./PageLayout.vue";

type Props = {
  title: string;
};

defineProps<Props>();
</script>

<style lang="scss" scoped>
.auth-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 32px;
}

.auth-layout {
  width: 100%;
  max-width: 600px;
}
</style>
