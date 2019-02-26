import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './../screen/Home'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
const appTabs=createBottomTabNavigator({
  Home:HomeScreen,
},
{
 defaultNavigationOptions: ({ navigation }) => ({
   tabBarIcon: ({ focused, horizontal, tintColor }) => {
     const { routeName } = navigation.state;
     let iconName;
     if (routeName === 'Home') {
       iconName = `ios-home${focused ? '' : ''}`;
     } 
     return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
   },
 }),
 
 tabBarOptions: {
   activeTintColor: '#0078d7',
   inactiveTintColor: '#333',
   showLabel: false,
   style:{
   paddingTop:8,
   }
 },
}
)
export default createAppContainer(appTabs);