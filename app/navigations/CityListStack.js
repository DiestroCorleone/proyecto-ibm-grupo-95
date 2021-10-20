import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CityList from '../screens/CityList';

const Stack = createStackNavigator();

export default function CityListStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="cityList"
        component={ CityList }
        options={{ title: "Lista de Ciudades" }}
      />
    </Stack.Navigator>
  );
}