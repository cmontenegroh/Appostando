import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import {
  calculateAdjustedProbabilities,
  calculateBookmakerMargin,
  calculateExpectedValue,
  calculateImpliedProbability,
} from '../calculations';

export default function Calculator() {
  const [oddsList, setOddsList] = useState([]); // Lista de objetos {cuota, probUsuario}
  const [newOdd, setNewOdd] = useState('');     // Campo temporal para cuota
  const [newUserProb, setNewUserProb] = useState(''); // Campo temporal para probabilidad usuario
  const [results, setResults] = useState(null);

  // Agrega una cuota y probabilidad del usuario
  const addOdd = () => {
    if (!newOdd.trim() || !newUserProb.trim()) {
      Alert.alert('Error', 'Ingresa cuota y probabilidad del usuario');
      return;
    }

    // Normalizar cuota y reemplazar coma por punto
    let cuota = parseFloat(newOdd.replace(',', '.')).toFixed(2);
    let probUsuario = parseFloat(newUserProb.replace(',', '.'));

    if (isNaN(cuota) || cuota <= 1) {
      Alert.alert('Error', 'La cuota debe ser un número mayor a 1');
      return;
    }

    if (isNaN(probUsuario) || probUsuario <= 0 || probUsuario > 100) {
      Alert.alert('Error', 'La probabilidad del usuario debe estar entre 0 y 100');
      return;
    }

    setOddsList([...oddsList, { cuota: parseFloat(cuota), probUsuario }]);
    setNewOdd('');
    setNewUserProb('');
  };

  // Borra una cuota específica
  const removeOdd = (index) => {
    const newList = [...oddsList];
    newList.splice(index, 1);
    setOddsList(newList);
  };

  // Calcula probabilidades y EV
  const handleCalculate = () => {
    if (oddsList.length === 0) {
      Alert.alert('Error', 'Ingresa al menos una cuota');
      return;
    }

    const cuotas = oddsList.map(item => item.cuota);
    const probsUsuario = oddsList.map(item => item.probUsuario / 100); // convertir % a decimal

    const impliedProbability = calculateImpliedProbability(cuotas);
    const margin = calculateBookmakerMargin(cuotas);
    const adjusted = calculateAdjustedProbabilities(cuotas);
    const ev = calculateExpectedValue(cuotas, probsUsuario); // array de números

    setResults({ impliedProbability, margin, adjusted, ev });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 APPostando Calculator</Text>

      {/* Entrada de cuota y probabilidad usuario */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Cuota"
          value={newOdd}
          onChangeText={setNewOdd}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="% Usuario"
          value={newUserProb}
          onChangeText={setNewUserProb}
          keyboardType="decimal-pad"
        />
        <Button title="+" onPress={addOdd} />
      </View>

      {/* Lista de cuotas ingresadas */}
      <FlatList
        data={oddsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.oddRow}>
            <Text style={styles.oddText}>
              • Cuota: {item.cuota} | Prob. usuario: {item.probUsuario}%
            </Text>
            <Button title="Eliminar" color="#ff4d4d" onPress={() => removeOdd(index)} />
          </View>
        )}
      />

      <Button title="Calcular" onPress={handleCalculate} color="#1e90ff" />

      {/* Resultados */}
      {results && (
        <View style={styles.results}>
          <Text>🔹 Implied Probability: {results.impliedProbability.join(', ')}%</Text>
          <Text>🔹 Bookmaker Margin: {results.margin}%</Text>
          <Text>🔹 Adjusted Probabilities: {results.adjusted.join(', ')}%</Text>
          <Text>
            🔹 Expected Value:{' '}
            {results.ev.map((v, i) => (
              <Text key={i} style={{ color: v >= 0 ? 'green' : 'red' }}>
                {v.toFixed(2)}{' '}
              </Text>
            ))}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f2f2f2' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1e90ff' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#1e90ff',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 5,
  },
  oddRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  oddText: { fontSize: 16 },
  results: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
});


// import { useState } from 'react';
// import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
// import {
//   calculateAdjustedProbabilities,
//   calculateBookmakerMargin,
//   calculateExpectedValue,
//   calculateImpliedProbability,
// } from '../calculations';

// export default function Calculator() {
//   const [odds, setOdds] = useState([]);       // Lista de cuotas ingresadas
//   const [newOdd, setNewOdd] = useState('');   // Campo temporal para la nueva cuota
//   const [results, setResults] = useState(null);

//   // Función para normalizar y validar la cuota
//   const addOdd = () => {
//     if (!newOdd.trim()) {
//       Alert.alert('Error', 'Ingresa un valor antes de agregar');
//       return;
//     }

//     // Reemplaza coma por punto
//     let normalized = newOdd.replace(',', '.');

//     // Limita a máximo 2 decimales
//     normalized = parseFloat(normalized).toFixed(2);

//     const value = parseFloat(normalized);
//     if (isNaN(value) || value <= 1) {
//       Alert.alert('Error', 'La cuota debe ser un número mayor a 1');
//       return;
//     }

//     setOdds([...odds, value]);
//     setNewOdd('');
//   };

//   // Calcula probabilidades, margen, ajustadas y EV
//   const handleCalculate = () => {
//     if (odds.length === 0) {
//       Alert.alert('Error', 'Ingresa al menos una cuota');
//       return;
//     }

//     const impliedProbability = calculateImpliedProbability(odds);
//     const margin = calculateBookmakerMargin(odds);
//     const adjusted = calculateAdjustedProbabilities(odds);
//     const ev = calculateExpectedValue(odds);

//     setResults({ impliedProbability, margin, adjusted, ev });
//   };

//   // Borra una cuota específica de la lista
//   const removeOdd = (index) => {
//     const newOdds = [...odds];
//     newOdds.splice(index, 1);
//     setOdds(newOdds);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎯 APPostando Calculator</Text>

//       {/* Entrada dinámica de cuotas */}
//       <View style={styles.row}>
//         <TextInput
//           style={styles.input}
//           placeholder="Ingresa una cuota"
//           value={newOdd}
//           onChangeText={setNewOdd}
//           keyboardType="decimal-pad"
//         />
//         <Button title="+" onPress={addOdd} />
//       </View>

//       {/* Lista de cuotas ingresadas */}
//       <FlatList
//         data={odds}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.oddRow}>
//             <Text style={styles.oddText}>• {item}</Text>
//             <Button title="Eliminar" color="#ff4d4d" onPress={() => removeOdd(index)} />
//           </View>
//         )}
//       />

//       <Button title="Calcular" onPress={handleCalculate} color="#1e90ff" />

//       {/* Resultados */}
//       {results && (
//         <View style={styles.results}>
//           <Text>🔹 Implied Probability: {results.impliedProbability.join(', ')}%</Text>
//           <Text>🔹 Bookmaker Margin: {results.margin}%</Text>
//           <Text>🔹 Adjusted Probabilities: {results.adjusted.join(', ')}%</Text>
//           <Text>🔹 Expected Value: {results.ev.join(', ')}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f2f2f2' },
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1e90ff' },
//   row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   input: { flex: 1, height: 50, borderColor: '#1e90ff', borderWidth: 2, borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#fff' },
//   oddRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, backgroundColor: '#fff', padding: 8, borderRadius: 8 },
//   oddText: { fontSize: 16 },
//   results: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
// });


// import { useState } from 'react';
// import { 
//   Button, 
//   StyleSheet, 
//   Text, 
//   TextInput, 
//   View, 
//   ScrollView, 
//   Alert 
// } from 'react-native';
// import { 
//   calculateAdjustedProbabilities, 
//   calculateBookmakerMargin, 
//   calculateExpectedValue, 
//   calculateImpliedProbability 
// } from '../calculations';

// export default function Calculator() {
//   const [odds, setOdds] = useState('');
//   const [impliedProbability, setImpliedProbability] = useState(null);
//   const [bookmakerMargin, setBookmakerMargin] = useState(null);
//   const [adjustedProbabilities, setAdjustedProbabilities] = useState(null);
//   const [expectedValue, setExpectedValue] = useState(null);

//   const handleCalculate = () => {
//     if (!odds.trim()) {
//       Alert.alert('Error', 'Por favor ingresa las cuotas separadas por comas');
//       return;
//     }

//     const oddsArray = odds.split(',').map(str => Number(str.trim()));

//     if (oddsArray.some(isNaN)) {
//       Alert.alert('Error', 'Todas las cuotas deben ser números válidos');
//       return;
//     }

//     setImpliedProbability(calculateImpliedProbability(oddsArray));
//     setBookmakerMargin(calculateBookmakerMargin(oddsArray));
//     setAdjustedProbabilities(calculateAdjustedProbabilities(oddsArray));
//     setExpectedValue(calculateExpectedValue(oddsArray));
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>🎯 APPostando Calculator</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Ej: 2.5, 3.0, 1.8"
//         value={odds}
//         onChangeText={setOdds}
//         keyboardType="numeric"
//       />

//       <View style={styles.buttonContainer}>
//         <Button title="Calcular" color="#1e90ff" onPress={handleCalculate} />
//       </View>

//       {impliedProbability && (
//         <Text style={styles.result}>🔹 Implied Probability: {impliedProbability.join(', ')}%</Text>
//       )}
//       {bookmakerMargin !== null && (
//         <Text style={styles.result}>🔹 Bookmaker Margin: {bookmakerMargin}%</Text>
//       )}
//       {adjustedProbabilities && (
//         <Text style={styles.result}>
//           🔹 Adjusted Probabilities: {adjustedProbabilities.join(', ')}%
//         </Text>
//       )}
//       {expectedValue && (
//         <Text style={styles.result}>🔹 Expected Value: {expectedValue.join(', ')}</Text>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 25,
//     backgroundColor: '#f2f2f2',
//   },
//   title: {
//     fontSize: 26,
//     marginBottom: 25,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#1e90ff',
//   },
//   input: {
//     height: 50,
//     borderColor: '#1e90ff',
//     borderWidth: 2,
//     borderRadius: 10,
//     marginBottom: 20,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   buttonContainer: {
//     marginBottom: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   result: {
//     fontSize: 18,
//     marginTop: 12,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     color: '#333',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//   },
// });
