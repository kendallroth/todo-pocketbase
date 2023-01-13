<template>
  <PageLayout title="Todos">
    <VList class="pt-0">
      <VTextField
        :append-inner-icon="mdiPlus"
        autofocus
        class="ma-3"
        color="primary"
        density="comfortable"
        :disabled="loadingTodos"
        hide-details
        :model-value="addTodoText"
        label=""
        placeholder="Add a todo..."
        variant="outlined"
        @click:append-inner="handleAddTodo"
        @keyup.enter="handleAddTodo"
        @update:model-value="(value) => (addTodoText = value)"
      />
      <LayoutStack class="mx-4" direction="row">
        <VChip
          v-for="status in statusChips"
          :color="selectedStatus === status.value ? 'primary' : undefined"
          :key="status.label"
          @click="getTodos(status.value)"
        >
          {{ status.label }}
        </VChip>
      </LayoutStack>
      <template v-if="!loadingTodos">
        <VListItem v-for="todo in todos" :key="todo.id">
          <template #prepend>
            <VCheckboxBtn
              :false-icon="mdiUnchecked"
              :model-value="todo.complete"
              :true-icon="mdiChecked"
              @update:modelValue="handleToggleTodo(todo, !todo.complete)"
            />
          </template>
          <VListItemTitle :class="{ 'text-decoration-line-through': todo.complete }">
            {{ todo.text }}
          </VListItemTitle>
          <template #append>
            <VBtn
              color="error"
              :icon="mdiDelete"
              size="small"
              variant="text"
              @click="deleteTodoConfirmation = todo"
            />
          </template>
        </VListItem>
      </template>
      <LayoutStack align-items="center" v-else>
        <VProgressCircular class="ma-2" color="primary" indeterminate size="64" />
      </LayoutStack>
    </VList>
    <ConfirmDialog
      :model-value="Boolean(deleteTodoConfirmation)"
      title="Delete Todo?"
      @cancel="deleteTodoConfirmation = null"
      @confirm="handleDeleteTodo(deleteTodoConfirmation!)"
    >
      Are you sure you want to delete this todo?
      <div class="font-weight-bold mt-2">{{ deleteTodoConfirmation?.text }}</div>
    </ConfirmDialog>
  </PageLayout>
</template>

<script setup lang="ts">
import {
  mdiCheckCircle as mdiChecked,
  mdiCircleOutline as mdiUnchecked,
  mdiDelete,
  mdiPlus,
} from "@mdi/js";
import type { Record } from "pocketbase";
import { onMounted, ref } from "vue";

import { useErrors, useSnackbar } from "~composables";
import { ConfirmDialog } from "~components/dialog";
import { LayoutStack } from "~components/layout";
import pocketbase from "~pocketbase";

import PageLayout from "./_components/PageLayout.vue";

const { getError } = useErrors();
const { notifyError, notifySuccess } = useSnackbar();

interface Todo {
  id: string;
  created: string;
  complete: boolean;
  text: string;
  userId: string;
}

const todos = ref<Todo[]>([]);
const loadingTodos = ref(true);

const selectedStatus = ref<undefined | true | false>(undefined);
const statusChips = [
  { label: "All", value: undefined },
  { label: "Completed", value: true },
  { label: "Outstanding", value: false },
];

const getTodos = async (completeFilter?: true | false | undefined) => {
  loadingTodos.value = true;
  selectedStatus.value = completeFilter;

  try {
    let filter = "";
    if (completeFilter === true) {
      filter = "complete = true";
    } else if (completeFilter === false) {
      filter = "complete = false";
    }

    // TODO: Update to use TS definition
    const records = await pocketbase
      .collection("todos")
      .getFullList(100, { filter, sort: "-created" });
    todos.value = records.map(mapPocketbaseTodo);
  } catch (e) {
    notifyError(getError(e));
  } finally {
    loadingTodos.value = false;
  }
};

const mapPocketbaseTodo = (todo: Record): Todo => ({
  complete: todo.complete,
  created: todo.created,
  id: todo.id,
  text: todo.text,
  userId: todo.user,
});

onMounted(() => {
  getTodos();
});

const addTodoText = ref("");

const handleAddTodo = async () => {
  const text = addTodoText.value.trim();
  if (!text) return;

  try {
    const todo = await pocketbase.collection("todos").create({
      text,
      user: pocketbase.authStore.model!.id,
    });
    todos.value.unshift(mapPocketbaseTodo(todo));
    addTodoText.value = "";
  } catch (e) {
    notifyError(getError(e));
  }
};

const handleToggleTodo = async (todo: Todo, complete: boolean) => {
  try {
    await pocketbase.collection("todos").update(todo.id, { complete });

    const localTodo = todos.value.find((t) => t.id === todo.id);
    if (localTodo) {
      localTodo.complete = complete;
    }
  } catch (e) {
    notifyError(getError(e));
  }
};

const deleteTodoConfirmation = ref<Todo | null>(null);

const handleDeleteTodo = async (todo: Todo) => {
  try {
    await pocketbase.collection("todos").delete(todo.id);

    todos.value = todos.value.filter((t) => t.id !== todo.id);

    deleteTodoConfirmation.value = null;
    notifySuccess("Todo was removed");
  } catch (e) {
    notifyError(getError(e));
  }
};
</script>
