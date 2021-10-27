import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/Map';

const Stack = createStackNavigator();

export default function MapStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="map"
        component={ Map }
        options={{ title: "Mapa", headerShown: false  }}
      />
    </Stack.Navigator>
  );
}