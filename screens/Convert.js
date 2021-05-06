import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Picker,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCoefficient, getCountryCurrency} from '../backend';
import AsyncStorage from '@react-native-community/async-storage';

export default function Convert() {
  const [coefficient, setCoefficient] = useState(1);
  const [arrName, setArrName] = useState([]);
  const [countries, setCountries] = useState();
  const [selectedValue1, setSelectedValue1] = useState('AF');
  const [selectedValue2, setSelectedValue2] = useState('AF');
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(async () => {
    const arrNameTemp = await AsyncStorage.getItem('arrName');
    setArrName(JSON.parse(arrNameTemp));
    // console.log(arrName);
    const countriesTemp = await AsyncStorage.getItem('countries');
    setCountries(JSON.parse(countriesTemp));
    // console.log(countries[selectedValue1].currencySymbol)
    // const coefficientTemp = await getCoefficient(
    // countries[selectedValue1].currencyId,
    // countries[selectedValue2].currencyId,
    // );
    // setCoefficient(coefficientTemp);
  }, [isUpdate]);

  useEffect(async () => {
    //console.log(selectedValue1, selectedValue2);
    const coefficientTemp = await getCoefficient(
      countries[selectedValue1].currencyId,
      countries[selectedValue2].currencyId,
    );
    console.log(coefficientTemp);
    setCoefficient(coefficientTemp);
  }, [selectedValue1, selectedValue2]);

  useEffect(() => {
    convert();
  }, [coefficient, input1]);

  const convert = () => {
    console.log(coefficient);
    setInput2(input1 * coefficient);
  };
  const change = () => {
    let temp = selectedValue1;
    setSelectedValue1(selectedValue2);
    setSelectedValue2(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>Convert Currency</Text>
      </View>
      <View style={styles.body}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={styles.tagCountry}>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue1}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue1(itemValue)
              }>
              {arrName.map((value, index) => (
                <Picker.Item value={value.key} label={value.name} key={index} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                let cur1 = parseFloat(text);
                setInput1(cur1);
              }}
              autoFocus={false}
              keyboardType="number-pad"
            />
            {/* <View>
              {countries[selectedValue1].currencySymbol}
            </View> */}
          </View>
          <TouchableOpacity onPress={change}>
            <MaterialCommunityIcons
              name="arrow-up-down-bold"
              size={40}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.tagCountry}>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue2}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue2(itemValue)
              }>
              {arrName.map((value, index) => (
                <Picker.Item
                  value={value.key}
                  label={value.name}
                  key={value.key}
                />
              ))}
            </Picker>
            <View style={styles.input}>
              <Text>{isNaN(input2) ? '' : input2}</Text>
            </View>
            {/* <View>
              {countries[selectedValue2].currencySymbol}
            </View> */}
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 200,
            }}>
            <MaterialCommunityIcons name="update" size={40} color="black" />
            <Text
              style={{fontSize: 20, fontWeight: 'bold'}}
              onPress={async () => {
                await getCountryCurrency();
                setIsUpdate(!isUpdate);
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#3399ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagCountry: {
    marginVertical: 30,
    flexDirection: 'row',
    borderColor: '#f2f2f2',
    borderRadius: 5,
    borderWidth: 1,
  },
  picker: {
    height: 40,
    width: 120,
  },
  input: {
    // backgroundColor:'#b3ffff',
    flex: 1,
    marginLeft: 20,
    borderBottomWidth: 1,
  },
});
