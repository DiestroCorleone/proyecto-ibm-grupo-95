import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import styles from '../../Styles';
import Loading from '../components/Loading';
import { ItemWeatherAgregar } from '../components/Modal';

export default function Map(){
  const [visible, setVisible] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [city, setCity] = useState("");
  const onChange = (e, type) => {//Toma un dato que va a cambiar, y el tipo de dato.
    setCity({ ...city, [type]: e.nativeEvent.text});//El Spread operator (...) pasa por todos los parámetros de un elemento.
  };
  const [data, setData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState([]);
  const toggleWeatherOverlay = () => {
    setVisibleWeather(!visibleWeather);
  };

  const appId = {YOUR_API_KEY};
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.cityName}&units=metric&appid=${appId}&lang=es`;

  const fetchApi = async () =>{
    if(isEmpty(city.cityName)){
      Alert.alert(
        "Weatherify dice:",
        "Por favor, ingresá el nombre de una ciudad",
      )
    }else if(size(city.cityName) < 3){
      Alert.alert(
        "Weatherify dice:",
        "Por favor ingresá al menos 3 caracteres.",
      )
    }else{

    try{
      setLoading(true);
      const response = await fetch (
        apiUrl
      ); 
      const json = await response.json();
      setLoading(false);
      setData(json);
      setWeatherIcon(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
      setVisibleWeather(!visibleWeather);
    }catch(error){
      setLoading(false);
      Alert.alert(
        "Weatherify dice:",
        "Ciudad no encontrada.",
      )
      console.error(error);
    }

    }
  };

  return (
    <View style={[styles.alignCenter]}>
      <Input
        placeholder="Ingresá el nombre de una ciudad..."
        inputContainerStyle={styles.input}
        onChange={(e) => onChange(e, "cityName")}
        rightIcon={          
          <Icon            
            type="material-community"
            name="magnify"
            color="lightgray"
            onPress={fetchApi}
          />
        }
      />
    <Loading isVisible={loading} text={"Buscando ciudad"} />
      <Image
        source={require("../../assets/img/map.png")}
        resizeMode="contain"
        style={styles.imageResponsive}
      />
      <ItemWeatherAgregar visible={visibleWeather} toggleOverlay={toggleWeatherOverlay} ciudad={data.name} icon={weatherIcon} />
    </View>
  );
}