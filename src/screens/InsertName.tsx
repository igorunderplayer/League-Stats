import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSummoner } from '../hooks/summoner';
import Riot from '../services/riot';
import themes from '../themes';

export default function InsertName() {
  const { name, region, setName, setRegion } = useSummoner()


  async function handleOnPress() {
    try {
      if (!name || !region) return
      const summoner = await new Riot(region).getSummonerByName(name)

      alert(summoner.name)

    } catch (e) {
      alert('Não foi possivel recuperar a conta, certifique-se que digitou corretamente')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello?</Text>


      <View style={styles.inputsContainer}>

        <TextInput
          value={region || ''}
          onChangeText={(text) => setRegion(text)}
          style={{
            borderRightWidth: 1,
            borderColor: '#fff',
            width: '15%',
            padding: 8
          }}
        />

        <TextInput
          value={name || ''}
          onChangeText={(text) => setName(text)}
          style={{
            width: '85%',
            padding: 8
          }}
        />

      </View>


      <TouchableOpacity onPress={handleOnPress}>
        <Text style={{
          color: '#999'
        }}>Selecionar</Text>
      </TouchableOpacity>

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
