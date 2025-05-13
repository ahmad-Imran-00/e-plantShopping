import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { name, increment } = action.payload;
      const item = state.items.find(i => i.name === name);
      if (item) {
        item.quantity += increment ? 1 : -1;
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter(i => i.name !== name);
    },
  },
});

export const { addItem, updateQuantity, removeItem } = CartSlice.actions;
export default CartSlice.reducer;
