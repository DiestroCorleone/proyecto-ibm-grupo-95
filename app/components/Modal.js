import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../../Styles';
import { Overlay, Button, Image } from 'react-native-elements'

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
  const { visible, toggleOverlay, ciudad, icon } = props;

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text>{ciudad}</Text>
      <Image
        source={{uri: icon}}
        style={{width: 200, height: 200}}
      />
      <Button buttonStyle={[styles.backgroundBlue, styles.margin]} title="Agregar a mis ciudades" />
    </Overlay>
  );
}