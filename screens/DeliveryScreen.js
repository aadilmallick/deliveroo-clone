import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Marker } from "react-native-maps";
import { colors } from "../config";
import * as Progress from "react-native-progress";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function DeliveryScreen() {
  const restaurant = useSelector((store) => store.restaurant.restaurant);
  const navigation = useNavigation();
  return (
    <View className="bg-primary flex-1">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-8 mx-4">
          <TouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons
              name="ios-exit-outline"
              size={24}
              color={colors.secondary}
            />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg tracking-wide">
            Order Help
          </Text>
        </View>
        <View className="bg-white shadow-2xl p-4 rounded m-8 z-50">
          <Text className="text-gray-400">Estimated Arrival</Text>
          <Text className="text-3xl font-extrabold tracking-tighter mb-4">
            45 - 55 minutes
          </Text>
          <Progress.Bar size={30} indeterminate color={colors.secondary} />
        </View>
      </SafeAreaView>
      <View className="flex-1 -mt-20">
        <MapView style={{ width: "100%", height: "100%" }}>
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
          />
        </MapView>
      </View>
    </View>
  );
}
