import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../App';
import styles from '../../Styles';
import ItemWeather, { CityListItem } from '../components/ItemWeather';
import { ItemWeatherModal } from '../components/Modal';

export default function CityList(){
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const toggleWeatherOverlay = (id) => {
    setVisibleWeather(!visibleWeather);
    setSelectedId(id);
  };

  const loadSavedCities = () => {
    db.transaction((tx) => {      
        tx.executeSql("select * from ciudades", [], 
        (sqlTx,res)=>{
          /*console.log(res.rows.item(0).id);*/
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log(item);
              results.push({ id: item.id, city: item.city, country: item.country, lon: item.lon, lat: item.lat, weatherIcon: item.weatherIcon});
            }
            setCityList(results);
          }else if(len == 0){
            setCityList(null);
          }
        }        
        /*(_, { rows }) =>   setCityList(JSON.stringify(rows))*/
        );
    null,
    console.log("Ejecutada loadSavedCities");
    });
  };
/*
  useEffect(()=> {
    async function getCities() {
      await loadSavedCities();
    }
    getCities();
  },[]);

 /* const renderCityList = cityList.map((item,index) =>{
    return <Text>{item}</Text>
  });*/

  /* Ejecuta la función loadSavedCities al enfocar la pantalla  */
  useFocusEffect(
    React.useCallback(() => {
        loadSavedCities();
    }, [])
  );

  return (
    <View style={ [styles.flex, styles.alignCenter, styles.backgroundLavender]}>
      <Searchbar
        placeholder="Ingresá el nombre de una ciudad..."
        style={ styles.marginSmall }
      />
    <ScrollView style={[styles.fullHeigth, styles.fullWidth ]} >
      { cityList &&
        cityList.map((item, i) => (
        <CityListItem
          title={item.city}
          onPress={()=>toggleWeatherOverlay(item.id)}
          iconFromApi={item.weatherIcon}/>
        ))
      }
    </ScrollView>
    <ItemWeatherModal visible={visibleWeather} afterAction={loadSavedCities} selectedId={selectedId} toggleOverlay={toggleWeatherOverlay} isPrincipal={false} />
    </View>
  );
}