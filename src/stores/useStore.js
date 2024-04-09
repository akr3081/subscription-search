import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const devConfig = { name: 'Subscription Search' };
const persistConfig = { name: 'subscription-search', getStorage: () => globalThis.sessionStorage };

const state = set => ({
  apiKey: '',
  setApiKey: value => {
    set({ apiKey: value });
  },

  channelId: '',
  setChannelId: value => {
    set({ channelId: value });
  },

  reset: () => {
    set({ apiKey: '', channelId: '' });
  }
});

const useStore = create(devtools(persist(state, persistConfig), devConfig));

export default useStore;
