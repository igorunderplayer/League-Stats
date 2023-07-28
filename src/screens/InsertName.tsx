import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSummoner } from '../hooks/summoner';
import Riot from '../services/riot';
import themes from '../themes';
import riot from '../services/riot';

export default function InsertName() {
  const { setName, setRegion } = useSummoner()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('')



  async function handleOnPress() {
    try {
      const summoner = await riot.getSummonerByName(typingName)

      alert(summoner.name)

      setName(typingName)
      setRegion(typingRegion)


    } catch (e) {
      alert('Não foi possivel recuperar a conta, certifique-se que digitou corretamente')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello?</Text>


      <View style={styles.inputsContainer}>

        <TextInput
          value={typingRegion}
          onChangeText={(text) => setTypingRegion(text)}
          style={{
            borderRightWidth: 1,
            borderColor: '#fff',
            width: '15%',
            padding: 8
          }}
        />

        <TextInput
          value={typingName}
          onChangeText={(text) => setTypingName(text)}
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
