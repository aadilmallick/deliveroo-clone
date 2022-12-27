import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Categories from "../components/Categories";
import { colors } from "../config";
import FeaturedRow from "../components/FeaturedRow";
import { useSanityQuery } from "../utils/useSanityQuery";
import { urlFor } from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar />
      <Header />
      <Body />
    </SafeAreaView>
  );
}

const Header = () => {
  return (
    <>
      <View tw="p-4 flex-row items-center bg-white">
        <Image
          source={{ uri: "https://source.unsplash.com/random/50x50" }}
          className="h-8 w-8 rounded-full"
        />
        <View tw="ml-4 flex-1">
          <View>
            <Text tw="text-xs text-gray-400">Deliver Now!</Text>
            <Text tw="text-lg font-bold">
              Current Location{" "}
              <Ionicons name="chevron-down" size={20} color={colors.primary} />
            </Text>
          </View>
        </View>
        <Ionicons name="person" size={24} color={colors.primary} />
      </View>
      <View tw="bg-white px-4 pb-4 flex-row items-center space-x-4 -mt-2">
        <View tw="flex-row space-x-2 bg-gray-300 p-1 rounded flex-1">
          <Ionicons name="search-outline" size={24} color="black" />
          <TextInput
            placeholder="search restaurants"
            keyboardType="default"
            tw="text-white"
          />
        </View>
        <Ionicons name="cog-outline" size={24} color="black" />
      </View>
    </>
  );
};

const Body = () => {
  const [data, loading, error] = useSanityQuery(`
  *[_type=="featured"]{
    ...,
    restaurants[]-> {
        ...,
      dishes[]-> {
        ...
      },
      category -> {
        name
      }
    }
  }
  `);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size={40} color="red" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
      }}
      className="flex-1"
    >
      <Categories />
      {data?.map((featuredRow) => (
        <FeaturedRow
          key={featuredRow._id}
          description={featuredRow.short_description}
          id={featuredRow._id}
          title={featuredRow.name}
          restaurants={featuredRow.restaurants}
        />
      ))}
    </ScrollView>
  );
};
