import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ id: state.products.length + 1, ...action.payload });
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => !action.payload.includes(product.id)
      );
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
