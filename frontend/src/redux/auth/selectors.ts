import type { RootState } from "../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
