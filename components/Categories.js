import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { urlFor } from "../sanity";
import { useSanityQuery } from "../utils/useSanityQuery";

export default function Categories() {
  const [data, loading] = useSanityQuery(`
  *[_type=="category"]{
    image, 
    _id, 
      name
  }
  `);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <CategoryCard
          url={urlFor(item.image).width(150).url()}
          title={item.name}
        />
      )}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
    >
      <Text>Categories</Text>
    </FlatList>
  );
}

const CategoryCard = ({ url, title }) => {
  return (
    <Pressable className="mr-4">
      <View className="bg-white rounded overflow-hidden relative">
        <Image source={{ uri: url }} className="w-24 h-24 object-cover" />
        <Text className="absolute w-full bg-white bottom-0 opacity-70 p-2">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

CategoryCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
