import * as React from 'react';
import { Platform } from 'react-native';
import * as SQLite from "expo-sqlite";
import Navigation from './app/navigations/Navigation';

/* Se crea la conexión a base de datos, que luego se exportará al resto de la app */
function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      }
    };
  }

  const db = SQLite.openDatabase("db.db");
    return db;
}

export const db = openDatabase();

export default function App() {

/* Se crea la base de datos, si no existe */
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists ciudades (id text primary key not null, city text, country text, lon text, lat text, weatherIcon text, main bool);",
      );
      tx.executeSql("select * from ciudades", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
    });
  }, []);
  
  return (    
    <Navigation />
  );
}