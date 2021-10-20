import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../../Styles';
import { Overlay } from 'react-native-elements';

export default function Home(){
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState(null);

  const toggleOverlay = (text) => {
    setModalText(text);
    setVisible(!visible);
  };

  return (
    <View style={[styles.backgroundPurple, styles.background]}>
      <Text style={ [styles.h1, styles.textWhite] }>Weather App</Text>
      <View style={ [styles.flex, styles.column ] }>
      <View style={ [styles.row, styles.bottom, styles.spaceAround] }>
        <Text onPress={ () => toggleOverlay("Cómo usar la App")}>Cómo usar la app</Text><Text onPress={ () => toggleOverlay("Quiénes somos: La historia del Grupo 95")}>Quiénes somos</Text>
      </View> 
      </View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay} >
          <Text>{modalText}</Text>
          <Button onPress={toggleOverlay} title="Cerrar" />
        </Overlay>   
    </View>
  );
}