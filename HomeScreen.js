import React,{useState, useLayoutEffect, useEffect} from 'react';
import { Text, View, ScrollView, RecyclerViewBackedScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const STORAGE_KEY = '@todo_Key';

export function HomeScreen({navigation,route}) {
  
  const [todos, setTodos] = useState([]);

  /**
   * Kun komponentti tuodaan näkyviin, haetaan tehtävät. Jos details-näkymässä päivitetään tehtävää,
   * lisätään tieto taulukkoon ja storageen.
   */
  useEffect(() => {
    if (route.params?.todo) {
      const add = {id: todos.length + 1, description: route.params.todo};
      const newTodos = [...todos,add];
      setTodos(newTodos);
      storeData(newTodos);
    }
    getData();
  },[route.params?.todo])

  /**
   * Muotoillaan headeria (navbaria/toolbaria).
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f0f0f0'
      },
      headerRight: () => ( 
        <FontAwesome style={styles.navButton} name="plus" onPress={() => navigation.navigate('Todo')} />
      ),
    })
  }),[navigation];

  /**
   * Funktio tallentaa tehtävät storageen.
   * 
   * @param {Array} value 
   */
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
    } catch (e) { 
      console.log(e);
    }
  }

  const getData = async() => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
      .then (req => JSON.parse(req))
      .then (json => {
        // Jos storagessa ei ole mitään, palautuu null. Luodaan tällöin tyhjä taulukko, jotta käyttöliittymä
        // näyttää tyhjän listan.
        if (json === null) {
          json = [];
        }
        setTodos(json);
      })
      .catch (error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          todos.map((item) => (
            <View style={styles.rowContainer} key={item.id}>
              <Text style={styles.rowText}>{item.description}</Text>
              <FontAwesome name="trash" onPress={() => navigation.navigate('Todo')} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}
