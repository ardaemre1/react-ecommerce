import create from 'zustand';

const useSepetStore = create((set) => ({
  sepet: [],
  addToSepet: (newItem) => set((state) => ({ sepet: [...state.sepet, { ...newItem, counter: 1 }] })),
  removeFromSepet: (itemId) => set((state) => ({ sepet: state.sepet.filter((item) => item.id !== itemId) })),
  clearSepet: () => set({ sepet: [] }),
  updateCounter: (itemId, newCounter) =>
    set((state) => ({
      sepet: state.sepet.map((item) => (item.id === itemId ? { ...item, counter: newCounter } : item)),
    })),
}));

export default useSepetStore;
