<template>
  <div class="action-bar">
    <div v-if="$slots.left || left" class="action-bar__side">
      <slot v-if="$slots.left" name="left" />
      <template v-else-if="left">
        <slot />
      </template>
    </div>
    <div v-if="$slots.right || right" class="action-bar__side is-right">
      <slot v-if="$slots.right" name="right" />
      <template v-else-if="right">
        <slot />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
type ActionBarProps = {
  /** Whether actions are left-aligned */
  left?: boolean;
  /** Whether actions are right-aligned */
  right?: boolean;
  /** Spacing in left/right action bars */
  spacing?: number;
};

withDefaults(defineProps<ActionBarProps>(), {
  left: false,
  right: false,
  spacing: 2,
});
</script>

<style lang="scss" scoped>
.action-bar {
  display: flex;
  width: 100%;
}

.action-bar__side {
  display: flex;
  align-items: center;

  // TODO: Consider using CSS Grid to standardize space between items???
  &:not(.is-right) {
    > :deep(*) {
      margin-right: spacing(2);
    }
  }
  &.is-right {
    > :deep(*) {
      margin-left: spacing(2);
    }
  }

  &.is-right {
    margin-left: auto;
  }
}
</style>
