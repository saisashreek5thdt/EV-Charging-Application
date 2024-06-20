import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../Screens/Home/HomeScreen";
import Favorite from "../Screens/Favorite/FavoriteScreen";
import Profile from "../Screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNvaigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name="Search" component={Home} />
        <Tab.Screen name='Favorite' component={Favorite} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}