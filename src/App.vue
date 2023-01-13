<template>
  <VApp>
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
    <VMain class="app-main">
      <LoginView v-if="page === 'login'" @login-success="handleLogin" />
      <RegisterView v-if="page === 'register'" />
      <TodosView v-if="page === 'lists'" />
      <TodosView v-if="page === 'list-items'" />
    </VMain>
    <TheAppSnackbar />
  </VApp>
</template>

<script setup lang="ts">
import { mdiCheck } from "@mdi/js";
import { onMounted, ref } from "vue";

import TheAppSnackbar from "~components/single/TheAppSnackbar.vue";
import { ConfirmDialog } from "~components/dialog";
import { useDialog } from "~composables";
import pocketbase from "~pocketbase";
import { useUserStore } from "~stores";
import TodosView from "~views/TodosView.vue";
import LoginView from "~views/LoginView.vue";
import RegisterView from "~views/RegisterView.vue";

type AuthPages = "login" | "register";
type AppPages = "lists" | "list-items";
type Pages = AuthPages | AppPages;

const page = ref<Pages>("login");

const userStore = useUserStore();

pocketbase.authStore.onChange((token, model) => {
  console.log("App.authListener", model);

  if (model === null) {
    userStore.clearAccount();
    page.value = "login";
    return;
  }

  // Ensure user store is updated when auth model changes
  userStore.setAccount({
    created: model.created,
    email: model.email,
    id: model.id,
    name: model.name ?? null,
    verified: model.verified ?? false,
  });
}, true);

onMounted(() => {
  if (pocketbase.authStore.isValid) {
    page.value = "lists";
  } else {
    page.value = "login";
  }
});

const handleLogin = () => {
  // NOTE: Updating store is handled automatically by Pocketbase
  page.value = "lists";
};

const logoutDialog = useDialog();

const handleLogout = () => {
  logoutDialog.hide();
  pocketbase.authStore.clear();
  userStore.clearAccount();
  page.value = "login";
};
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
}
</style>
