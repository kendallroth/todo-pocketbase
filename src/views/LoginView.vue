<template>
  <AuthLayout title="Login">
    <LayoutStack is="form" align-items="stretch" @submit.prevent="handleLogin">
      <TextField autofocus :disabled="isSubmitting" label="Email" name="email" />
      <TextField :disabled="isSubmitting" label="Password" name="password" type="password" />
      <VBtn block color="primary" :loading="isSubmitting" rounded="pill" size="large" type="submit">
        Submit
      </VBtn>
    </LayoutStack>
    <template #append>
      <VBtn variant="text" @click="notifyNotImplemented">Forgot Password?</VBtn>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

import { TextField } from "~components/form";
import { LayoutStack } from "~components/layout";
import { useErrors, useSnackbar } from "~composables";
import pocketbase from "~pocketbase";

import AuthLayout from "./_components/AuthLayout.vue";

const { notifyError, notifyNotImplemented } = useSnackbar();
const { getError } = useErrors();

const emit = defineEmits<{
  (event: "login-success"): void;
}>();

const validationSchema = yup.object({
  email: yup.string().label("Email").email().required(),
  password: yup.string().label("Password").required(),
});
const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const handleLogin = handleSubmit(async (data) => {
  try {
    await pocketbase.collection("users").authWithPassword(data.email, data.password);
    emit("login-success");
  } catch (e) {
    notifyError(getError(e));
    setFieldError("email", "Invalid credentials");
  }
});
</script>
