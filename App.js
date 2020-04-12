import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Slider } from 'react-native';
import MapView, { Heatmap } from 'react-native-maps';
import { data } from './data/datafile.js';

const maxWeight = 250;
let slideVal
const sentence = ["The virus will spread ", "many times faster compared to when 100% of the populus commits to social distancing"]
const spreadRates = [
  3.01833850105052e-07,
  1.5576634781289462e-07,
  1.8044242329011704e-07,
  7.908108877530029e-08,
  1.3088674180780102e-08,
  5.2182652968095124e-08,
  3.783610717304059e-08,
  1.356444494407871e-08,
  8.257265806106525e-08,
  1.526986112731195e-07,
  2.122659115663692e-07,
  2.542831777276874e-07,
  2.7557902734110303e-07,
  2.758404656559209e-07,
  2.5681686425042995e-07,
  2.2173852217172464e-07,
  1.7489744169406737e-07,
  1.2130791690379308e-07,
  6.637554916863816e-08,
  1.5533575437275583e-08,
  2.6159951827616972e-08,
  5.4440906117927064e-08,
  6.623083910457869e-08,
  5.99509546335313e-08,
  3.571092324665778e-08,
  4.662208155766587e-09,
  5.7770839235840766e-08,
  1.1896330290936677e-07,
  1.827923117383506e-07,
  2.435691449011223e-07,
  2.959542169742641e-07,
  3.3551841215938914e-07,
  3.5921088858467676e-07,
  3.656778388611687e-07,
  3.553920635552757e-07,
  3.30573643188093e-07,
  2.949054492280196e-07,
  2.5307133440300763e-07,
  2.1016705924636965e-07,
  1.7105188483923783e-07,
  1.3972005608547163e-07,
  1.1877438474801333e-07,
  1.090776648378246e-07,
  1.0964141137184832e-07,
  1.1778596604310835e-07,
  1.295729490912518e-07,
  1.4047293469154138e-07,
  1.4619162795868127e-07,
  1.4354123702585517e-07,
  1.3121514841186065e-07,
  1.1030907009529494e-07,
  8.443599561120576e-08,
  5.9310735266217015e-08,
  4.173645602036196e-08,
  3.8012870950402707e-08,
  5.190305989395254e-08,
  8.243949341929844e-08,
  1.2201051323787134e-07,
  1.5533183915432115e-07,
  1.6005076878736807e-07,
  1.0982178240875101e-07,
  1.9311442822554984e-08,
  2.3854742652742164e-07,
  5.316685104492224e-07,
  8.364797057830969e-07,
  1.0238425946944685e-06,
  8.774704478866365e-07,
  8.003454194029397e-08,
  1.7855766116471955e-06,
  5.2065807563810246e-06,
  1.0663125610011065e-05,
  1.847701439258855e-05,
  2.855016725453301e-05,
  3.994463450724644e-05,
  5.02410431532114e-05,
  5.459399405104519e-05,
  4.438053507080847e-05,
  5.310759815375326e-06,
  8.516292623399117e-05,
  0.0002613401056272202,
  0.000573918400402522,
  0.0010960936447182393,
  0.0019314800725799802,
  0.0032242905609972247,
  0.005172303099123003,
  0.008043239309449779,
  0.012195295671059803,
  0.018102699926194364,
  0.026387315966677004,
  0.03785749246700946,
  0.053555545995981786,
  0.07481549087898257,
  0.10333287841918037,
  0.14124889026310494,
  0.1912511478716597,
  0.25669405581661375,
  0.3417418945630982,
  0.45153832271144967,
  0.5924064435624047,
  0.7720841409892774
]

export default function App() {
  const [points, setPoints] = useState([]);
  const [maxTime, setMaxTime] = useState(79);
  const [selectedTime, setTime] = useState(maxTime);
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
          setMaxTime(value3['cases'].length);
          arr.push(obj);
        }
      }
    }
    setPoints(arr);
  }

  function updateTime(sliderTime) {
    setTime(sliderTime);
    sliderVal = sliderTime
    generateArray();
  }

  useEffect(() => {
    generateArray();
  }, []);

  let selectedDate = new Date("2020-01-22");
  selectedDate.setDate(22+selectedTime);
  let date = selectedDate.getDate();
  let month = selectedDate.getMonth()+1;
  let year = selectedDate.getFullYear();

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
        maximumValue={maxTime}
        value={maxTime}
        step={1}
        onValueChange={(sliderValue) => updateTime(sliderValue)}
      />
      <Text>
        {sentence[0]}{spreadRates[slideVal]*100}{sentence[1]}
      </Text>
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
