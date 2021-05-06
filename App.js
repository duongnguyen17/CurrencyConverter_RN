import React, {useEffect} from 'react';
import Convert from './screens/Convert';
import {getCountryCurrency} from './backend';
import AsyncStorage from '@react-native-community/async-storage';
export default function App() {
  useEffect(async () => {
    const key = await AsyncStorage.getAllKeys();
    if (key.length === 0) {
      console.log("có chạy")
      getCountryCurrency();
    }
  }, []);
  return <Convert />;
}
