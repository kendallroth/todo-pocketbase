<template>
  <VApp>
    <TheAppBar @logout="handleLogout" />
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
import { onMounted, ref } from "vue";

import TheAppBar from "~components/single/TheAppBar.vue";
import TheAppSnackbar from "~components/single/TheAppSnackbar.vue";
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

/** Clean up authentication state and redirect to login */
const handleLogout = (clearPocketbaseAuth = true) => {
  if (clearPocketbaseAuth) {
    pocketbase.authStore.clear();
  }

  userStore.clearAccount();
  page.value = "login";
};

pocketbase.authStore.onChange((token, model) => {
  console.log("App.authStore.onChange", model);

  if (model === null || !pocketbase.authStore.isValid) {
    // Avoid clearing pocketbase auth within change handler (causes infinite loop)
    handleLogout(false);
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

onMounted(async () => {
  // Refresh auth token on page load (requires valid token)
  if (pocketbase.authStore.isValid) {
    pocketbase.collection("users").authRefresh().catch(handleLogout);

    page.value = "lists";
  } else {
    handleLogout();
  }
});

const handleLogin = () => {
  // NOTE: Updating store is handled automatically by Pocketbase
  page.value = "lists";
};
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
}
</style>
