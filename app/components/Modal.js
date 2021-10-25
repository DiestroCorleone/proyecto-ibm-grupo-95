import React, { useState, useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import * as SQLite from "expo-sqlite";
import styles from '../../Styles';
import { Overlay, Button, Image } from 'react-native-elements';
import { db } from '../../App';

export default function Modal(props){
  const { visible, toggleOverlay, modalText } = props;

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
      <Text>{modalText}</Text>
        <Button buttonStyle={styles.backgroundBlue} onPress={toggleOverlay} title="Cerrar" />
    </Overlay>
  );     
}

export function ItemWeatherModal(props){
  const { visible, toggleOverlay, isPrincipal } = props;

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      { isPrincipal
        ? <Button buttonStyle={[styles.backgroundRed, styles.margin]} title="Eliminar ciudad principal" />
        : <Button buttonStyle={[styles.backgroundBlue, styles.margin]} title="Elegir como ciudad principal" />
      }
      <Button buttonStyle={[styles.backgroundRed, styles.margin]} title="Eliminar de ciudades guardadas" />
    </Overlay>
  );
}

export function ItemWeatherAgregar(props){
  const { visible, toggleOverlay, ciudad, icon, countryObject } = props;

  /*Guardamos datos ciudad*/
  const saveCity = (id, city, country, lon, lat, weatherIcon) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into ciudades (id, city, country, lon, lat, weatherIcon) values (?,?,?,?,?,?)", [id, city, country, lon, lat, weatherIcon]);
        tx.executeSql("select * from ciudades", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
    );
    toggleOverlay();
  };
  /*End Guardamos datos ciudad*/

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text>{ciudad}</Text>
      <Image
        source={{uri: icon}}
        style={{width: 200, height: 200}}
      />
      <Button
        buttonStyle={[styles.backgroundBlue, styles.margin]}
        title="Agregar a mis ciudades"
        onPress={() => saveCity(countryObject[0], countryObject[1], countryObject[2], countryObject[3], countryObject[4], countryObject[5])}
        />
    </Overlay>
  );
}