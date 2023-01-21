import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import InsertName from './src/screens/InsertName';

export default function App() {
  return (
    <View style={styles.container}>
      <InsertName />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
});
