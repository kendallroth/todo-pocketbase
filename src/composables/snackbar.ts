import { onBeforeUnmount, reactive, ref } from "vue";

interface UseSnackbar {
  notify: (message: string, type?: SnackbarType | null) => void;
  notifyError: (message: string) => void;
  notifyNotImplemented: () => void;
  notifySuccess: (message: string) => void;
  notifyWarning: (message: string) => void;
  snackbar: Snackbar;
}

interface Snackbar {
  text: string;
  type: SnackbarType | null;
  visible: boolean;
}

type SnackbarType = "success" | "error" | "warning";

const snackbarStore = reactive<Snackbar>({
  text: "",
  type: null,
  visible: false,
});

const SNACKBAR_DURATION = 4000;

/** Snackbar notification utility */
const useSnackbar = (): UseSnackbar => {
  const snackbarTimeout = ref<number | undefined>();

  onBeforeUnmount(() => {
    clearTimeout(snackbarTimeout.value);
  });

  const notify = (message: string, type: SnackbarType | null = null) => {
    // NOTE: Delay must be established before changing visibility!
    const closeDelay = snackbarStore.visible ? 250 : 10;

    snackbarStore.visible = false;

    // NOTE: Wait until previous snackbar has closed to avoid flickering/jumps!
    setTimeout(() => {
      snackbarStore.text = message;
      snackbarStore.type = type;
      snackbarStore.visible = true;
    }, closeDelay);

    clearTimeout(snackbarTimeout.value);
    snackbarTimeout.value = window.setTimeout(() => {
      snackbarStore.visible = false;
    }, SNACKBAR_DURATION);
  };

  const notifyError = (message: string) => notify(message, "error");
  const notifyNotImplemented = () => notify("Not implemented yet", "error");
  const notifySuccess = (message: string) => notify(message, "success");
  const notifyWarning = (message: string) => notify(message, "warning");

  return {
    notify,
    notifyError,
    notifyNotImplemented,
    notifySuccess,
    notifyWarning,
    snackbar: snackbarStore,
  };
};

export { useSnackbar };
