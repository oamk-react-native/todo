import React,{useState, useLayoutEffect} from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

export function DetailsScreen({route, navigation}) {
  const [todo, setTodo] = useState(route.params?.todo);

  /**
   * Lisätään tallenna-painike työkaluvalikkoon. Kun tallennusta painetaan, välitetään tallennettu tehtävä takaisin
   * tehtävälistaan.
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#a4c639'
      },
      headerRight: () => (
        <FontAwesome style={styles.navButton} name="save" onPress={() => navigation.navigate('Home',{todo: todo})} />
      ),
    })
  }),[navigation];

  return (
    <View style={styles.container}>
      <TextInput style={styles.newTask} onChangeText={text => setTodo(text)} value={todo} placeholder="Add new task"/>
    </View>
  )
}
