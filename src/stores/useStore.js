import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const devConfig = { name: 'Subscription Search' };
const persistConfig = { name: 'subscription-search', storage: createJSONStorage(() => globalThis.localStorage) };

const state = set => ({
  apiKey: '',
  setApiKey: value => {
    set({ apiKey: value });
  },

  channelId: '',
  setChannelId: value => {
    set({ channelId: value });
  },

  searchTerm: '',
  setSearchTerm: value => {
    set({ searchTerm: value });
  },

  subscriptions: [],
  setSubscriptions: value => {
    set({ subscriptions: value });
  },

  reset: () => {
    set({ apiKey: '', channelId: '', searchTerm: '', subscriptions: [] });
  }
});

const useStore = create(devtools(persist(state, persistConfig), devConfig));

export default useStore;
