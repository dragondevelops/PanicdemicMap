import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Slider } from 'react-native';
import MapView, { Heatmap } from 'react-native-maps';
import { data } from './data/datafile.js';

const maxWeight = 250;

export default function App() {
  const [points, setPoints] = useState([]);
  const [selectedTime, setTime] = useState(79);
  function generateArray() {
    let arr = [];
    for (const [key, value] of Object.entries(data)) {
      for (const [key2, value2] of Object.entries(value)) {
        for (const [key3, value3] of Object.entries(value2)) {
          let obj = {
            latitude: value3.coords[0],
            longitude: value3.coords[1],
            weight: value3.cases[selectedTime]
          }
          if (obj.weight > maxWeight) obj.weight = maxWeight;
          arr.push(obj);
        }
      }
    }
    setPoints(arr);
  }
  function updateTime(sliderTime) {
    setTime(sliderTime);
    generateArray();
  }
  useEffect(() => {
    generateArray();
  }, []);
  let selectedDate = new Date("2020-01-22");
  selectedDate.setDate(selectedTime);
  let date = selectedDate.getDate();
  let month = selectedDate.getMonth();
  let year = selectedDate.getFullYear();
  console.log(selectedDate);
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 39.381266,
          longitude: -97.922211,
          latitudeDelta: 70,
          longitudeDelta: 70,
        }}
      >
        { points ?
        <Heatmap
          points={points}
          radius={50}
        />
         : null
        }
      </MapView>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={79}
        value={79}
        step={1}
        onValueChange={(sliderValue) => updateTime(sliderValue)}
      />
      <Text>
        {month}/{date}/{year}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  slider: {
    flex:1,
    width: Dimensions.get('window').width - 20
  }
});
