import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../config";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mt-4 mr-8"
      onPress={() => navigation.navigate("Restaurant", { ...props })}
    >
      <View className="bg-white rounded-sm">
        <Image
          source={{ uri: props.imgUrl }}
          className="w-64 h-32 rounded-sm"
        />
        <Text className="p-2 text-lg font-bold">{props.title}</Text>
        <Text className="px-2 pb-1">
          <Ionicons name="star" size={16} color={colors.secondary} />
          <Text className="text-secondary">{props.rating}</Text> | {props.genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

RestaurantCard.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  address: PropTypes.string,
  short_description: PropTypes.string,
  dishes: PropTypes.array,
  long: PropTypes.number,
  lat: PropTypes.number,
};
