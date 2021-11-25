import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import styles from '../../Styles';
import { Overlay } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../App';
import Modal, { ItemWeatherModal } from '../components/Modal';
import ItemWeather, { CityListItem } from '../components/ItemWeather';

export default function Home(){
  const [visible, setVisible] = useState(false);
  const [visibleWeather, setVisibleWeather] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [selectedId, setSelectedId] = useState([]);

  const toggleOverlay = (text) => {
    setModalText(text);
    setVisible(!visible);
  };

  const toggleWeatherOverlay = (id) => {
    setVisibleWeather(!visibleWeather);
    setSelectedId(id);
  };

  /* Se carga la ciudad principal, si la hay */

  const loadPrincipal = () => {
    db.transaction((tx) => {      
        tx.executeSql("select id, city, temp, weatherIcon from ciudades where main = 1", [],
        (sqlTx,res)=>{
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              console.log(item);
              results.push({ id: item.id, city: item.city, temp: item.temp, weatherIcon: item.weatherIcon});
            }
            setPrincipal(results);
          }else if(len == 0){
            setPrincipal(null);
          }
        }        
        );
    null,
    console.log("Ejecutada loadPrincipal");
    });
  };  

  /* Ejecuta la función loadSavedCities al enfocar la pantalla  */
  useFocusEffect(
    React.useCallback(() => {
      loadPrincipal();
    }, [])
  );
  
  return (
    <View style={styles.flex} >
      <LinearGradient
        colors={['#7012eb', '#07429b']}
        style={styles.background}
      />
      <View style={styles.alignCenter}>
        { principal &&
          principal.map((item, i) => (
            <CityListItem
              title={item.city}
              temp={item.temp}
              onPress={()=>toggleWeatherOverlay(item.id)}
              iconFromApi={item.weatherIcon}/>
            ))
          }

          <Image 
            source={require('../../assets/img/ImgHome.png')}
            style = {styles.imgHome}  
          />

        <Text style={ [styles.h1, styles.textWhite] }>Weatherify</Text>
        <Text style = {styles.homeFrase}>Check the weather from anywhere, anywhere</Text>
      </View>
      <View style={ [styles.flex, styles.column ] }>
      <View style={ [styles.row, styles.bottom, styles.spaceAround ] }>
        <Text style={[styles.textWhite, styles.textButton, styles.backgroundPurple]} onPress={ () => toggleOverlay(comoUsar)}>Cómo usar la app</Text>
        <Text style={[styles.textWhite, styles.textButton, styles.backgroundPurple]} onPress={ () => toggleOverlay(quienesSomos)}>Quiénes somos</Text>
      </View> 
      </View>
        <Modal visible={visible} toggleOverlay={toggleOverlay} modalText={modalText} />
        <ItemWeatherModal visible={visibleWeather} afterAction={loadPrincipal} selectedId={selectedId} toggleOverlay={toggleWeatherOverlay} isPrincipal={true} />
    </View>
  );
}

const comoUsar = "Weatherify te ayudará a monitorear el clima en tiempo real, en las ciudades del mundo que vos elijas. Tenés que viajar? Administrás un negocio con sucursales en distintas partes del mundo? No te preocupes, con Weatherify estarás un paso adelante. En Home podrás ver tu ciudad preferida. El Lista de Ciudades tendrás acceso a las ciudades guardadas. Y en Mapa, podrás buscar y agregar a tus ciudades aquellas que prefieras, y visualizarlas en el mapa. Dando tap sobre cualquier ciudad, tanto en la Lista como en el Mapa, podrás ver el detalle del clima de esa ciudad, elegirla como principal, o eliminarla. Te hacemos fácil ver el pronóstico, te hacemos más fácil la vida :)";

const quienesSomos = "El 'Grupo 95', como se conoce al dúo de desarrolladores Newen Gayone y Matías Pérez (Río Negro y Buenos Aires, Argentina, respectivamente) vieron cruzados sus caminos como parte de un curso brindado por Codo a Codo (GCBA) e IBM. Combinaron sus fortalezas en un equipo dinámico, autogestionado, capaz de desarrollar en paralelo soluciones para la misma herramienta, funcionando como un par de engranajes en perfecta sincronía. Visitá github.com/DiestroCorleone/proyecto-ibm-grupo-95 para conocer más :D";
