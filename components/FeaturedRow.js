import { View, Text, FlatList } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../config";
import RestaurantCard from "./RestaurantCard";
import { urlFor } from "../sanity";

export default function FeaturedRow({ id, title, description, restaurants }) {
  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold capitalize">{title}</Text>
        <Ionicons
          name="arrow-forward-outline"
          size={24}
          color={colors.secondary}
        />
      </View>
      <Text className="text-gray-400 text-xs">{description}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        data={restaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RestaurantCard
            imgUrl={urlFor(item.image).width(300).url()}
            address={item.address}
            title={item.name}
            dishes={item.dishes}
            lat={item.lat}
            rating={item.rating}
            short_description={item.short_description}
            id={item._id}
            long={item.long}
            genre={item.category.name}
            key={item._id}
          />
        )}
      />
    </View>
  );
}

FeaturedRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  restaurants: PropTypes.array,
};
