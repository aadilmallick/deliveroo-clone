import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import {
  selectUniqueBasketItems,
  removeFromBasket,
  getBasketTotal,
} from "../features/basket/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../config";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function BasketScreen() {
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const basketItems = useSelector((state) => {
    return selectUniqueBasketItems(state);
  });
  const total = useSelector(getBasketTotal);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white p-4 items-center">
        <Text className="text-lg font-bold">Basket</Text>
        <Text className="text-gray-400">{restaurant.title}</Text>
        <TouchableOpacity
          className="absolute bg-primaryDark p-2 rounded-full right-3 top-4 shadow-lg"
          onPress={navigation.goBack}
        >
          <Ionicons name="exit" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View className="bg-white p-4 flex-row my-8 items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Image
            source={{ uri: restaurant.imgUrl }}
            className="h-8 w-8 rounded-full"
          />
          <Text>Deliver in 50-75 min</Text>
        </View>
        <View>
          <Text className="text-primary font-bold">Change</Text>
        </View>
      </View>
      <ScrollView className="flex-1">
        {Object.keys(basketItems).map((id) => {
          return (
            <BasketItem
              key={id}
              name={basketItems[id][0].name}
              price={Number(basketItems[id][0].price).toFixed(2)}
              number={Number(basketItems[id].length)}
              image={basketItems[id][0].imgUrl}
              id={id}
            />
          );
        })}
      </ScrollView>
      <View className="bg-white p-4 flex-row items-center justify-between">
        <Text className="text-gray-400">Subtotal</Text>
        <Text className="text-gray-400">${Number(total).toFixed(2)}</Text>
      </View>
      <View className="bg-white p-4 flex-row items-center justify-between">
        <Text className="text-gray-400">Delivery fee</Text>
        <Text className="text-gray-400">$5.00</Text>
      </View>
      <View className="bg-white p-4 flex-row items-center justify-between">
        <Text className="font-bold">Total</Text>
        <Text className="font-bold">${(Number(total) + 5).toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        className="bg-primary rounded-lg p-4 mx-4"
        onPress={() => navigation.navigate("PreparingOrderScreen")}
      >
        <Text className="font-bold text-white text-center">Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const BasketItem = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <View className="bg-white p-4 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Text className="">{props.number} x</Text>
          <Image
            source={{ uri: props.image }}
            className="h-12 w-12 rounded-full"
          />
        </View>
        <View className="flex-row items-center space-x-2">
          <Text>${props.price}</Text>
          <TouchableOpacity
            onPress={() => dispatch(removeFromBasket(props.id))}
          >
            <Text className="text-primary font-bold">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="border-b border-gray-200"></View>
    </>
  );
};
