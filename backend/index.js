import AsyncStorage from '@react-native-community/async-storage';
import {APIKey, BaseURL} from '../constants/index';
import axios from 'axios';
export const getCountryCurrency = async () => {
  console.log('gọi hàm getCountryCurrency');
  const getCountriesURL = `${BaseURL}/countries?apiKey=${APIKey}`;
  try {
    const result = await axios.get(getCountriesURL);
    const countries = result.data.results;
    // console.log(countries)
    await AsyncStorage.clear();
    await AsyncStorage.setItem('countries', JSON.stringify(countries));

    const arrName = Object.entries(countries).map(([key, obj]) => {
      return {key: key, name: obj.name, currencyId: obj.currencyId};
    });
    await AsyncStorage.setItem('arrName', JSON.stringify(arrName));

    // const test1= await AsyncStorage.getAllKeys()
    // console.log(test1)
    // const test2 = await AsyncStorage.multiGet(test1)
    // console.log(test2)
  } catch (error) {
    console.log(error);
  }
};
export const getCoefficient = async (id1, id2) => {
  console.log(id1, id2);
  const convertURL = `${BaseURL}/convert?q=${id1}_${id2}&compact=ultra&apiKey=${APIKey}`;
  //console.log(convertURL)
  try {
    const result = await axios.get(convertURL);
    //console.log(result.data)
    return Object.values(Object.values(result.data))[0];
  } catch (error) {
    console.log(error);
  }
};
