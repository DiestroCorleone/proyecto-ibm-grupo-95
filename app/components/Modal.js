import React, {useState} from 'react';
import { Text, Button } from 'react-native';
import styles from '../../Styles';
import { Overlay } from 'react-native-elements'

export default function Modal(props){
  const { visible, toggleOverlay, modalText } = props;

  return(
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay} >
      <Text>{modalText}</Text>
        <Button onPress={toggleOverlay} title="Cerrar" />
    </Overlay>
  );     
}