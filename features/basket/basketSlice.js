import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items.push(action.payload);
    },
    /**
     * removes the first item from the basket with the matching id. ID should be action.payload,
     * which is the id of the dish.
     */
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const basketReducer = basketSlice.reducer;
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// * only returns the items with matching id
export const selectBasketItemsWithId = (state, id) => {
  return state.basket.items.filter((item) => item.id === id);
};

// * only returns the items with matching id
export const getBasketTotal = (state) => {
  return state.basket.items.reduce((total, item) => (total += item.price), 0);
};

export const selectUniqueBasketItems = (state, id) => {
  // I want to only leave one of each id and the object associated with it in the array.
  const uniqueIds = [...new Set(state.basket.items.map((item) => item.id))];

  const mydict = {};

  uniqueIds.forEach((id) => {
    mydict[id] = [];
  });

  state.basket.items.forEach((item) =>
    mydict[item.id].push({
      name: item.name,
      price: item.price,
      imgUrl: item.imgUrl,
    })
  );

  return mydict;
};
