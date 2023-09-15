import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, FlatList, Alert, Image } from 'react-native';

export default function App() {
  
  const [keyword, setKeyword] = useState("");
  const [repository, setRepository] = useState([]);
  const getRepositories = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + keyword)
      .then(response => {
        //console.log(response)
        return response.json()
      })
      .then(data => setRepository(data.meals))
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  }
  return (
    <View style={styles.container}>

      <TextInput
        keyboardType="default"
        style={styles.input}
        placeholder='Keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories} />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.item}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image style = {{width:200,height:200}} source={{
              uri: item.strMealThumb
            }} />

          </View>}
        data={repository}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 200
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: 'lightblue',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray', 
    padding: 16,
  },
});