import React, { useState, useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import styles from '../../Styles';
import { Overlay, Button, Image } from 'react-native-elements';
import { db } from '../../App';

export default function Modal(props){
  const { visible, toggleOverlay, modalText } = props;

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
      <Text style= {styles.TextModal}>{modalText}</Text>
      <View style={styles.buttonContent}>
        <Button buttonStyle={styles.BtnModal} onPress={toggleOverlay} title="Cerrar" />
      </View>
    </Overlay>
  );     
}

export function ItemWeatherModal(props){
  const { visible, toggleOverlay, selectedId, isPrincipal, afterAction = null } = props;

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayCity}>
      { isPrincipal
        ? <Button
            buttonStyle={[styles.backgroundRed, styles.BtnCity]}
            title="Eliminar ciudad principal"
            onPress={() => deletePrincipal(selectedId, toggleOverlay, afterAction)}
          />
        : <Button
            buttonStyle={[styles.backgroundBlue, styles.BtnCity]}
            title="Elegir como ciudad principal"
            onPress={() => setPrincipal(selectedId,toggleOverlay)}
          />
      }
      <Button
        buttonStyle={[styles.backgroundRed, styles.BtnCity]}
        title="Eliminar de ciudades guardadas"
        onPress={() => deleteCity(selectedId, toggleOverlay, afterAction)}
      />
    </Overlay>
  );
}

export function ItemWeatherAgregar(props){
  const { visible, toggleOverlay, ciudad, temp, icon, countryObject, afterAction } = props;

  /*Guardamos datos ciudad*/
  const saveCity = (id, city, country, temp, lon, lat, weatherIcon, afterAction) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into ciudades (id, city, country, temp, lon, lat, weatherIcon) values (?,?,?,?,?,?,?)", [id, city, country, temp, lon, lat, weatherIcon]);
        tx.executeSql("select * from ciudades", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
    );
    afterAction();
    toggleOverlay();
  };
  /*End Guardamos datos ciudad*/

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayCityAdd}>
      <Text>{ciudad}</Text>
      <Image
        source={{uri: icon}}
        style={{width: 200, height: 200}}
      />
      <Button
        buttonStyle={[styles.backgroundBlue]}
        title="Agregar a mis ciudades"
        onPress={() => saveCity(countryObject[0], countryObject[1], countryObject[2], countryObject[3], countryObject[4], countryObject[5], countryObject[6], afterAction)}
        />
    </Overlay>
  );
}

/*Funciones relativas a base de datos*/

const setPrincipal = (id, toggleOverlay) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`update ciudades set main = 0 where main = 1;`, []);
      tx.executeSql(`update ciudades set main = 1 where id = ?;`, [id]);
      tx.executeSql("select * from ciudades", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    null,
  );
  toggleOverlay();
  console.log("Set Principal");
};

const deletePrincipal = (id, toggleOverlay, afterAction) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`update ciudades set main = 0 where id = ?;`, [id]);
      tx.executeSql("select * from ciudades", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    null,
  );
  afterAction();
  toggleOverlay();
  console.log("Ejecutada deletePrincipal");
};

const deleteCity = (id, toggleOverlay, afterAction) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from ciudades where id = ?;`, [id]);
      tx.executeSql("select * from ciudades", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    null,
  );
  afterAction();
  toggleOverlay();
  console.log("Ejecutada deleteCity");
};

