import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { size, isEmpty } from 'lodash';
import styles from '../../Styles';
import Loading from '../components/Loading';
import { ItemWeatherAgregar } from '../components/Modal';

export default function Map(){
  const [visible, setVisible] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [loading, setLoading] = useState(false); 
  
  /*Seteamos datos ciudad*/
  const [id, setId] = useState([]);
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState([]);
  const [country, setCountry] = useState([]);
  const [lon, setLon] = useState([]);
  const [lat, setLat] = useState([]);
  /*Seteamos datos ciudad*/

  const onChange = (e, type) => {//Toma un dato que va a cambiar, y el tipo de dato.
    setCity({ ...city, [type]: e.nativeEvent.text});//El Spread operator (...) pasa por todos los parámetros de un elemento.
  };

  const toggleWeatherOverlay = () => {
    setVisibleWeather(!visibleWeather);
  };

  const appId = '8907f766ae142af38c94180fc7c47fb0';
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
      setId(json.id);
      setCity(json.name);
      setWeatherIcon(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
      setLon(json.coord.lon);
      setLat(json.coord.lat);
      setCountry(json.sys.country);
      console.log("Respuesta API: "+json);
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
      <Searchbar
        placeholder="Ingresá el nombre de una ciudad..."
        onChange={(e) => onChange(e, "cityName")}
        onIconPress={fetchApi}
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