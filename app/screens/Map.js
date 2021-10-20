import React from 'react';
import { View, Text, Image } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../../Styles';

export default function Map(){
  return (
    <View style={[styles.alignCenter]}>
      <Input
        placeholder="Ingresá el nombre de una ciudad..."
        inputContainerStyle={ [styles.input] }
      />
      <Image
        source={require("../../assets/img/map.png")}
        resizeMode="contain"
        style={styles.imageResponsive}
      />
    </View>
  );
}