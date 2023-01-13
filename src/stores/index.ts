import { createPinia } from "pinia";

const rootPiniaStore = createPinia();

export { rootPiniaStore };
export { useUserStore } from "./user.store";
