import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../config";
import PropTypes from "prop-types";
import { urlFor } from "../sanity";
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
  getBasketTotal,
} from "../features/basket/basketSlice";
import { setRestaurant } from "../features/restaurant/restaurantSlice";
import BasketBar from "../components/BasketBar";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(setRestaurant({ ...params }));
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <BasketBar />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="relative">
          <Image source={{ uri: imgUrl }} className="w-full h-56" />
          <TouchableOpacity
            className="absolute bg-white opacity-80 rounded-full top-10 left-5 p-1 shadow-lg"
            onPress={navigation.goBack}
          >
            <Ionicons name="arrow-undo" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <View className="bg-white p-4 space-y-2">
            <Text className="font-bold text-2xl tracking-tighter">{title}</Text>
            <Text className="uppercase tracking-widest font-thin">
              <Ionicons name="star" size={16} color={colors.secondary} />
              <Text className="text-secondary">{rating}</Text> | {genre} |{" "}
              {address}
            </Text>
            <Text className="text-gray-400">{short_description}</Text>
          </View>
          <View className="p-4">
            <Text className="font-bold text-lg tracking-tighter uppercase">
              Menu
            </Text>
            {dishes.map((dish) => (
              <DishRow
                id={dish._id}
                key={dish._id}
                imgUrl={urlFor(dish.image).url()}
                name={dish.name}
                price={dish.price}
                short_description={dish.short_description}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DishRow({ id, imgUrl, price, name, short_description }) {
  const [numOfThisDish] = useSelector((state) => {
    return [selectBasketItemsWithId(state, id).length];
  });
  const dispatch = useDispatch();

  const onAddToBasket = () => {
    dispatch(addToBasket({ id, name, price, imgUrl }));
  };

  const onRemoveFromBasket = () => {
    dispatch(removeFromBasket(id));
  };
  return (
    <>
      <View className="mb-4 bg-white p-2 shadow-2xl">
        <View className="rounded-sm flex-row justify-between items-center">
          <View>
            <Text className="text-lg">{name}</Text>
            <Text className="text-gray-400">{short_description}</Text>
            <Text className="text-gray-400">${price}</Text>
          </View>
          <Image source={{ uri: imgUrl }} className="h-12 w-12" />
        </View>
        <View className="w-full border-b border-gray-200 my-4"></View>
        <View className="flex-row space-x-4 items-center">
          <TouchableOpacity onPress={onAddToBasket}>
            <View className="bg-secondary rounded-full">
              <Ionicons name="add" size={30} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="font-bold text-xl">{numOfThisDish}</Text>
          <TouchableOpacity
            onPress={onRemoveFromBasket}
            disabled={numOfThisDish === 0}
          >
            <View
              className={`rounded-full ${
                numOfThisDish === 0 ? "bg-gray-600" : "bg-secondary"
              }`}
            >
              <Ionicons name="remove" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

DishRow.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  short_description: PropTypes.string.isRequired,
};
