import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import Colors from "../Utils/Colors";
import Home from "../Screens/Home/HomeScreen";
import Favorite from "../Screens/Favorite/FavoriteScreen";
import Profile from "../Screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNvaigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name="Search" component={Home} options={{
          tabBarActiveTintColor:Colors.PRIMARY,
          tabBarIcon: ({color, size}) => (
            <Feather name='search' size={size} color={color} />
          )
        }} />
        <Tab.Screen name='Favorite' component={Favorite} options={{
          tabBarActiveTintColor:Colors.PRIMARY,
          tabBarIcon: ({color, size}) => (
            <Feather name='heart' size={size} color={color} />
          )
        }} />
        <Tab.Screen name='Profile' component={Profile} options={{
          tabBarActiveTintColor:Colors.PRIMARY,
          tabBarIcon: ({color, size}) => (
            <Feather name='user' size={size} color={color} />
          )
        }} />
    </Tab.Navigator>
  )
}