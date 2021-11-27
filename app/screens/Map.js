import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { size, isEmpty, isUndefined } from 'lodash';
import axios from 'axios';
import styles from '../../Styles';
import Loading from '../components/Loading';
import { ItemWeatherAgregar } from '../components/Modal';
import MapComponent from '../components/MapComponent';
import { db } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';

export default function Map(){
  const [visible, setVisible] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedCity, setSearchedCity] = useState('');

  /*Seteamos datos ciudad*/
  const [id, setId] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState([]);
  const [country, setCountry] = useState([]);
  const [temp, setTemp] = useState([]);
  const [lon, setLon] = useState([]);
  const [lat, setLat] = useState([]);
  /* End Seteamos datos ciudad*/
  const [markers, setMarkers] = useState([]);

  /* Muestra u oculta modal */
  const toggleWeatherOverlay = () => {
    setVisibleWeather(!visibleWeather);
  };

  const appId = 'ff1b03229e0538b78aebdbe11a3be644';

// API request con Axios
const consumeApi = () => {
  if(isEmpty(searchedCity)){
      Alert.alert(
        "Weatherify dice:",
        "Por favor, ingresá el nombre de una ciudad",
      )
    }else if(size(searchedCity) < 3){
      Alert.alert(
        "Weatherify dice:",
        "Por favor ingresá al menos 3 caracteres.",
      )
    }else{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${appId}&lang=es`)
      .then(function (response) {
        setLoading(false);
        const json = response.data;
        setId(json.id);
        setCity(json.name);
        setWeatherIcon(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
        setLon(json.coord.lon);
        setLat(json.coord.lat);
        setCountry(json.sys.country);
        setTemp(json.main.temp);
        console.log("Respuesta API: "+json);
        setVisibleWeather(!visibleWeather);
        setSearchedCity('');
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

// Carga markers
const loadSavedMarkers = () => {
    db.transaction((tx) => {      
        tx.executeSql("select id, city, lon, lat from ciudades", [], 
        (sqlTx,res)=>{
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log(item);
              results.push({ id: item.id, city: item.city, lon: item.lon, lat: item.lat});
            }
            setMarkers(results);
            console.log("Luego de setMarkers: "+results);
          }else if(len == 0){
            setMarkers(null);
          }
        }        
        );
    null,
    console.log("Ejecutada loadSavedMarkers como AfterAction");
    });
  };
  
  /* Ejecuta la función loadSavedCities al enfocar la pantalla  */
  useFocusEffect(
    React.useCallback(() => {
        loadSavedMarkers();
    }, [])
  );

  return (
    <View style={[styles.flex, styles.alignTop,styles.backgroundSky]}>
      <LinearGradient
        colors={['#7012eb', '#07429b']}
        style={styles.background}
      />
      <Searchbar
        placeholder="Ingresá el nombre de una ciudad..."

        onChange={(event) =>{
          setSearchedCity(event.nativeEvent.text);
        }}

        onIconPress={consumeApi}
        value={searchedCity}
        style={styles.marginSmall}
      />
      
      <MapComponent markers={markers} />
      
      <Loading isVisible={loading} text={"Buscando ciudad"} />
      <ItemWeatherAgregar visible={visibleWeather} toggleOverlay={toggleWeatherOverlay} ciudad={data.name} icon={weatherIcon} countryObject={[id, city, country, temp, lon, lat, weatherIcon]} afterAction={loadSavedMarkers} />
    </View>
  );
}
