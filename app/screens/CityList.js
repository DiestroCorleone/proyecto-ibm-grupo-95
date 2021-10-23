import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../../Styles';
import ItemWeather from '../components/ItemWeather';
import { ItemWeatherModal } from '../components/Modal';

export default function CityList(){
  const [visibleWeather, setVisibleWeather] = useState(false);
  const toggleWeatherOverlay = () => {
    setVisibleWeather(!visibleWeather);
  };

  return (
    <View style={ [styles.flex, styles.alignCenter]}>
      <Input
        placeholder="Ingresá el nombre de una ciudad..."
        inputContainerStyle={ [styles.input] }
      />
    <ScrollView style={[styles.fullHeigth, styles.fullWidth ]}>
      {
        cityList.map((item, i) => (
        <ItemWeather key={i} title={item.title} iconType={item.iconType} icon={item.icon} iconColor={item.iconColor} onPress={toggleWeatherOverlay} />
        ))
      }
    </ScrollView>
    <ItemWeatherModal visible={visibleWeather} toggleOverlay={toggleWeatherOverlay} isPrincipal={false} />
    </View>
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