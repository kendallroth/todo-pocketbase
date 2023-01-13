<template>
  <VAppBar color="primary">
    <VIcon class="ml-4" color="white" :icon="mdiCheck" />
    <VToolbarTitle>ToDo Pocketbase</VToolbarTitle>
    <template #append>
      <VMenu v-if="userStore.user" :offset="4">
        <template #activator="{ props }">
          <VBtn v-bind="props" icon>
            <VAvatar color="white">{{ userStore.user.name?.charAt(0) ?? "?" }}</VAvatar>
          </VBtn>
        </template>
        <VList :min-width="200">
          <VListItem class="font-weight-bold">{{ userStore.user.name }}</VListItem>
          <VListItem @click="logoutDialog.show">Logout</VListItem>
        </VList>
      </VMenu>
      <ConfirmDialog
        :model-value="logoutDialog.open.value"
        title="Logout?"
        @cancel="logoutDialog.hide"
        @confirm="handleLogout"
      >
        Are you sure you want to logout?
      </ConfirmDialog>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
import { mdiCheck } from "@mdi/js";

import { ConfirmDialog } from "~components/dialog";
import { useDialog } from "~composables";
import { useUserStore } from "~stores";

const emit = defineEmits<{
  (event: "logout"): void;
}>();

const userStore = useUserStore();

const logoutDialog = useDialog();

const handleLogout = () => {
  logoutDialog.hide();
  emit("logout");
};
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
}
</style>
