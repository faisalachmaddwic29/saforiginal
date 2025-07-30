// types/pinia-plugin-persistedstate.d.ts
import 'pinia';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<_S, _Store> {
    persist?: boolean | PersistedStateOptions;
  }
}
