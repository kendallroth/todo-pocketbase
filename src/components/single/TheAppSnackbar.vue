<template>
  <VSnackbar
    :color="(snackbar.type as string)"
    location="bottom left"
    :model-value="snackbar.visible"
  >
    {{ snackbar.text }}
  </VSnackbar>
</template>

<script lang="ts" setup>
import { useSnackbar } from "~composables";

const { snackbar } = useSnackbar();
</script>
