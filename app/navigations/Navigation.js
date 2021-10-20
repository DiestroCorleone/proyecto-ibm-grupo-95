import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';

import HomeStack from "../navigations/HomeStack";
import CityListStack from "../navigations/CityListStack";
import MapStack from "../navigations/MapStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
   return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          inactiveTintColor: 'grey',
          activeTintColor: 'slateblue'
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color)
        })}      
      >
        <Tab.Screen
          name="home"
          component={ HomeStack }
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="cityList"
          component={ CityListStack }
          options={{ title: "Lista de Ciudades" }}
        />
        <Tab.Screen
          name="map"
          component={ MapStack }
          options={{ title: "Mapa" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color){
  let iconName;

  switch(route.name) {
    case "home":
      iconName = "home-outline"
      break;
    case "cityList":
      iconName = "format-list-bulleted-square"
      break;
    case "map":
      iconName = "map-marker-outline"
      break;   
    default:
      break;
  }

  return(
    <Icon type="material-community" name={iconName} size={22} color={ color } />
  )
}
