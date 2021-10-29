import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { size, isEmpty, isUndefined } from 'lodash';
import axios from 'axios';
import styles from '../../Styles';
import Loading from '../components/Loading';
import { ItemWeatherAgregar } from '../components/Modal';

export default function Map(){
  const [visible, setVisible] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [loading, setLoading] = useState(false); 
  
  /*Seteamos datos ciudad*/
  const [id, setId] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState([]);
  const [country, setCountry] = useState([]);
  const [lon, setLon] = useState([]);
  const [lat, setLat] = useState([]);
  /* End Seteamos datos ciudad*/

  const onChange = (e, type) => {//Toma un dato que va a cambiar, y el tipo de dato.
    setCity({ ...city, [type]: e.nativeEvent.text});//El Spread operator (...) pasa por todos los parámetros de un elemento.
  };
  
  /* Muestra u oculta modal */
  const toggleWeatherOverlay = () => {
    setVisibleWeather(!visibleWeather);
  };

  const appId = {YOUR_API_KEY};

// API request con Axios
const consumeApi = () => {
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
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.cityName}&units=metric&appid=${appId}&lang=es`)
      .then(function (response) {
        setLoading(false);
        const json = response.data;
        setId(json.id);
        setCity(json.name);
        setWeatherIcon(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
        setLon(json.coord.lon);
        setLat(json.coord.lat);
        setCountry(json.sys.country);
        console.log("Respuesta API: "+json);
        setVisibleWeather(!visibleWeather);
        console.log(response.data);
      })
      .catch(function (error) {
        Alert.alert(
          "Weatherify dice:",
          "Ciudad no encontrada.",
        )
        console.error(error);
      })
      .then(function () {
      // always executed
      })
    }
};
  
  
  return (
    <View style={[styles.flex, styles.alignTop,styles.backgroundSky]}>
      <Searchbar
        placeholder="Ingresá el nombre de una ciudad..."
        onChange={(e) => onChange(e, "cyName")}
        onIconPress={consumeApi}
        style={styles.marginSmall}
      />
    <Loading isVisible={loading} text={"Buscando ciudad"} />
      <Image
        source={require("../../assets/img/map.png")}
        resizeMode="contain"
        style={styles.imageResponsive}
      />
      <ItemWeatherAgregar visible={visibleWeather} toggleOverlay={toggleWeatherOverlay} ciudad={data.name} icon={weatherIcon} countryObject={[id, city, country, lon, lat, weatherIcon]} />
    </View>
  );
}