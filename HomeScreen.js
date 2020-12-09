import React,{useState, useLayoutEffect, useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

export function HomeScreen({navigation,route}) {
  const [todos, setTodos] = useState([
    'Eat breakfast',
    'Buy milk',
  ]);

  /**
   * Lisätään tallenna-painike työkaluvalikkoon. Kun tallennusta painetaan, välitetään tallennettu tehtävä takaisin
   * tehtävälistaan.
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

  useEffect(() => {
    if (route.params?.todo) {
      const newTodos = [...todos,route.params?.todo];
      setTodos(newTodos);
    }
  },[route.params?.todo])

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          todos.map((item,index) => (
            <View style={styles.rowContainer} key={index}>
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}
