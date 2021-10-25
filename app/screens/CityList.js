import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { db } from '../../App';
import styles from '../../Styles';
import ItemWeather, { CityListItem } from '../components/ItemWeather';
import { ItemWeatherModal } from '../components/Modal';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function CityList(){
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const toggleWeatherOverlay = () => {
    setVisibleWeather(!visibleWeather);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadSavedCities = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from ciudades;",
        []);        
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
          }
        }        
        /*(_, { rows }) =>   setCityList(JSON.stringify(rows))*/
        );
    null,
    console.log("Ejecutada loadSavedCities");
    });
  };

  useEffect(()=> {
    async function getCities() {
      await loadSavedCities();
    }
    getCities();
  },[]);

 /* const renderCityList = cityList.map((item,index) =>{
    return <Text>{item}</Text>
  });*/

  return (
    <View style={ [styles.flex, styles.alignCenter]}>
      <Searchbar
        placeholder="Ingresá el nombre de una ciudad..."
        style={ styles.marginSmall }
      />
    <ScrollView 
      style={[styles.fullHeigth, styles.fullWidth ]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  
    >
      {
        cityList.map((item, i) => (
        <CityListItem title={item.city} onPress={toggleWeatherOverlay} iconFromApi={item.weatherIcon}/>
        ))
      }
    </ScrollView>
    <ItemWeatherModal visible={visibleWeather} toggleOverlay={toggleWeatherOverlay} isPrincipal={false} />
    </View>
  );
}
/*
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
  ]*/  