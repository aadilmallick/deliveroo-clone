import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getBasketTotal } from "../features/basket/basketSlice";
import { useNavigation } from "@react-navigation/native";

export default function BasketBar() {
  const [items, numItems, totalPrice] = useSelector((state) => [
    state.basket.items,
    state.basket.items.length,
    getBasketTotal(state),
  ]);
  const navigation = useNavigation();

  if (numItems === 0) {
    return null;
  }

  return (
    <View className="absolute bottom-5 z-50 w-full">
      <TouchableOpacity
        className="bg-primary mx-5 p-4 rounded-lg flex-row justify-between items-center"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="font-extrabold text-white py-1 px-3 text-lg bg-primaryDark rounded">
          {numItems}
        </Text>
        <Text className="font-bold text-white text-lg">View Basket</Text>
        <Text className="font-bold text-white text-lg">
          ${Number(totalPrice).toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
