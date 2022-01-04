import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {ThemeConsumer} from "styled-components";

const Tab = createBottomTabNavigator();


const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <ThemeConsumer>
      {
        theme=>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.mainBgColor,
            },
            tabBarActiveTintColor: theme.accentColor,
            tabBarInactiveTintColor: theme.textColor,
            headerStyle: {
              backgroundColor: theme.mainBgColor,
            },
            headerTitleStyle: {
              color: theme.mainBgColor,
            },
            tabBarLabelStyle: {
              marginTop: -5,
              fontSize: 10,
              fontWeight: "600",
            },
          }}
        >
          <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"film-outline"} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="TV"
            component={Tv}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="tv-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"search-outline"} color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      }
    </ThemeConsumer>
  );
};

export default Tabs;