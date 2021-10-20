import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../Styles';
import ItemWeather from '../components/ItemWeather';

export default function CityList(){
  return (
    <ScrollView>
      {
        cityList.map((item, i) => (
        <ItemWeather key={i} title={item.title} iconType={item.iconType} icon={item.icon} iconColor={item.iconColor} />
        ))
      }
    </ScrollView>
  );
}

const cityList = [
    {
      title: "Buenos Aires",
      iconType: "material-community",
      icon: "weather-sunny",
      iconColor: "lightgray",
    },
    {
      title: "Sao Paulo",   
      iconType: "material-community",   
      icon: "weather-cloudy",
      iconColor: "lightgray",
    },
    {
      title: "Dusseldorf",
      iconType: "material-community",
      icon: "weather-snowy",
      iconColor: "lightgray",
    },
    {
      title: "Tokyo",
      iconType: "material-community",
      icon: "weather-sunny",
      iconColor: "lightgray",
    },
    {
      title: "Dublin",
      iconType: "material-community",
      icon: "weather-rainy",
      iconColor: "lightgray",
    },
  ]  