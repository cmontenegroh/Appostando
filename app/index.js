
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Bienvenido a APPostando</Text>
      <Text style={styles.subtitle}>
        Tu asistente de cálculo para apuestas inteligentes
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/calculator')}
      >
        <Text style={styles.buttonText}>Ir a Calculadora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function HomeScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏆 Bienvenido a APPostando</Text>
//       <Text style={styles.subtitle}>
//         Tu asistente de cálculo para apuestas inteligentes
//       </Text>

//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={() => router.push('/calculator')}
//       >
//         <Text style={styles.buttonText}>Ir a Calculadora</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f2f2f2',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1e90ff',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#1e90ff',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


// import Calculator from '../src/utils/components/Calculator';

// export default function Home() {
//   return <Calculator />;
// }
