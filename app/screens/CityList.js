import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../App';
import styles from '../../Styles';
import ItemWeather, { CityListItem } from '../components/ItemWeather';
import { ItemWeatherModal } from '../components/Modal';
import { LinearGradient } from 'expo-linear-gradient';

export default function CityList(){
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchedCity, setSearchedCity] = useState('');

  /* Muestra u oculta modal */
  const toggleWeatherOverlay = (id) => {
    setVisibleWeather(!visibleWeather);
    setSelectedId(id);
  };

  /* Se carga la lista de ciudades guardadas si las hay. */

  const loadSavedCities = () => {
    db.transaction((tx) => {      
        tx.executeSql("select * from ciudades", [], 
        (sqlTx,res)=>{
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log(item);
              results.push({ id: item.id, city: item.city, temp: item.temp, country: item.country, lon: item.lon, lat: item.lat, weatherIcon: item.weatherIcon});
            }
            setCityList(results);
          }else if(len == 0){
            setCityList(null);
          }
        }        
        );
    null,
    console.log("Ejecutada loadSavedCities");
    });
  };

  /* Ejecuta la función loadSavedCities al enfocar la pantalla  */
  useFocusEffect(
    React.useCallback(() => {
        loadSavedCities();
    }, [])
  );

  return (
    <View style={ [styles.flex, styles.alignCenter, styles.backgroundLavender]}>
      <LinearGradient
        colors={['#7012eb', '#07429b']}
        style={styles.background}
      />
      <Searchbar
        placeholder="Buscar..."
        style={ styles.marginSmall }
        onChange={(event)=>{
          setSearchedCity(event.nativeEvent.text);
        }}
      />
      <ScrollView style={[styles.fullHeigth, styles.fullWidth]} >
        <View style= {styles.alignCenter}>
          { cityList &&
            cityList.filter((item)=>{
            if(searchedCity == ''){
              return item;
            }else if(item.city.toLowerCase().includes(searchedCity.toLowerCase())){
              return item;
            }
          }).map((item, i) => (
            <CityListItem
              title={item.city}
              temp={item.temp}
              onPress={()=>toggleWeatherOverlay(item.id)}
              iconFromApi={item.weatherIcon}              
            />
            ))
          }
        </View>  
      </ScrollView>
      <ItemWeatherModal visible={visibleWeather} afterAction={loadSavedCities} selectedId={selectedId} toggleOverlay={toggleWeatherOverlay} isPrincipal={false} />
    </View>
  );
}