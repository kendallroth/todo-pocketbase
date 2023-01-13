import { acceptHMRUpdate, defineStore } from "pinia";

import type { User } from "~typings/user.type";

interface UserState {
  user: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
  }),
  getters: {
    authenticated: (state) => Boolean(state.user),
  },
  actions: {
    /** Clear authenticated user (logout, etc) */
    clearAccount() {
      this.$reset();
    },
    /** Set authenticated account information */
    setAccount(payload: User | null) {
      this.user = payload;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
