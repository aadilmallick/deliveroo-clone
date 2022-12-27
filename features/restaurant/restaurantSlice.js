import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = { ...action.payload };
    },
  },
});

export const restaurantReducer = restaurantSlice.reducer;
export const { setRestaurant } = restaurantSlice.actions;
