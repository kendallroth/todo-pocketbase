import { ref } from "vue";

import type { Ref } from "vue";

interface UseDialog {
  show: () => void;
  hide: () => void;
  toggle: (open: boolean) => void;
  /**
   * Whether dialog is open (reactive)
   *
   * NOTE: Reference can be modified directly by modifying 'open.value', which enables using
   *         the reference as 'v-model' attribute on dialogs.
   */
  open: Ref<boolean>;
}

/** Dialog state management */
const useDialog = (): UseDialog => {
  const dialogOpen = ref(false);

  const hideDialog = () => {
    dialogOpen.value = false;
  };
  const showDialog = () => {
    dialogOpen.value = true;
  };
  const toggleDialog = (open: boolean) => {
    dialogOpen.value = open;
  };

  return {
    hide: hideDialog,
    show: showDialog,
    toggle: toggleDialog,
    open: dialogOpen,
  };
};

export { useDialog };
