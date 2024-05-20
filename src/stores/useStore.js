import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { THEMES } from '../common/constants';

const devConfig = { name: 'Subscription Search' };
const persistConfig = { name: 'subscription-search', storage: createJSONStorage(() => globalThis.localStorage) };

export const initialState = {
  history: [],
  searchResults: [],
  searchTerm: '',
  selectedSubscriptions: [],
  subscriptions: [],
  theme: THEMES.LIGHT,
  userData: {}
};

const state = set => ({
  history: initialState.history,
  setHistory: value => {
    set({ history: value });
  },

  searchResults: initialState.searchResults,
  setSearchResults: value => {
    set({ searchResults: value });
  },

  searchTerm: initialState.searchTerm,
  setSearchTerm: value => {
    set({ searchTerm: value });
  },

  selectedSubscriptions: initialState.selectedSubscriptions,
  setSelectedSubscriptions: value => {
    set({ selectedSubscriptions: value });
  },

  subscriptions: initialState.subscriptions,
  setSubscriptions: value => {
    set({ subscriptions: value });
  },

  theme: initialState.theme,
  setTheme: value => {
    set({ theme: value });
  },

  userData: initialState.userData,
  setUserData: value => {
    set({ userData: value });
  },

  reset: () => {
    set(initialState);
  }
});

const useStore = create(devtools(persist(state, persistConfig), devConfig));

export default useStore;
