import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../../Styles';
import { Overlay } from 'react-native-elements';
import Modal from '../components/Modal';
import ItemWeather from '../components/ItemWeather';

export default function Home(){  
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState(null);

  const toggleOverlay = (text) => {
    setModalText(text);
    setVisible(!visible);
  };

  return (
    <View style={[styles.backgroundPurple, styles.background ]}>
      <View style={styles.alignCenter}>
      <Text style={ [styles.h1, styles.textWhite] }>Weatherify</Text>
      <ItemWeather key={0} title={ciudadPrincipal.title} iconType={ciudadPrincipal.iconType} icon={ciudadPrincipal.icon} iconColor={ciudadPrincipal.iconColor} />
      </View>
      <View style={ [styles.flex, styles.column ] }>
      <View style={ [styles.row, styles.bottom, styles.spaceAround ] }>
        <Text style={styles.textWhite} onPress={ () => toggleOverlay(comoUsar)}>Cómo usar la app</Text><Text style={styles.textWhite} onPress={ () => toggleOverlay(quienesSomos)}>Quiénes somos</Text>
      </View> 
      </View>
        <Modal visible={visible} toggleOverlay={toggleOverlay} modalText={modalText} />
    </View>
  );
}

const comoUsar = "Cómo usar la app: Weatherify te ayudará a monitorear el clima en tiempo real, en las ciudades del mundo que vos elijas. Tenés que viajar? Administrás un negocio con sucursales en distintas partes del mundo? No te preocupes, con Weatherify estarás un paso adelante. En Home podrás ver tu ciudad preferida. El Lista de Ciudades tendrás acceso a las ciudades guardadas. Y en Mapa, podrás buscar y agregar a tus ciudades aquellas que prefieras, y visualizarlas en el mapa. Dando tap sobre cualquier ciudad, tanto en la Lista como en el Mapa, podrás ver el detalle del clima de esa ciudad, elegirla como principal, o eliminarla. Te hacemos fácil ver el pronóstico, te hacemos más fácil la vida :)";

const quienesSomos = "Quiénes somos: La historia del Grupo 95. PRÓXIMAMENTE";

const ciudadPrincipal = {
  title: "Buenos Aires",
  iconType: "material-community",
  icon: "weather-sunny",
  iconColor: "lightgray",
};