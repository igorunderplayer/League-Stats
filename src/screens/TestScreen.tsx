import { StyleSheet, Text, View } from 'react-native'
import { useSummoner } from '../hooks/summoner';
import themes from '../themes';

export default function TestScreen() {
  const { summoner } = useSummoner()

  console.log(summoner)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello?</Text>

      <Text style={styles.text}>Invocador: {summoner?.name}</Text>
      <Text style={styles.text}>Nível: {summoner?.summonerLevel}</Text>
      <Text style={styles.text}>ID: {summoner?.id}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  },
  inputsContainer: {
    backgroundColor: '#444',
    height: 48,
    width: 256,
    flexDirection: 'row'
  }
});
