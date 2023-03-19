import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSummoner } from '../hooks/summoner';
import Riot from '../services/riot';
import themes from '../themes';

const REGIONS = [
  { name: 'BR', code: 'br1' },
  { name: 'EUW', code: 'euw1' }
]

export default function Welcome() {
  const { setName, setRegion, resetSummoner } = useSummoner()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('BR1')

  async function handleOnPress() {
    try {
      const summoner = await new Riot(typingRegion).getSummonerByName(typingName)

      alert(summoner.name)

      setName(typingName)
      setRegion(typingRegion)


    } catch (e) {
      alert('Não foi possivel recuperar a conta, certifique-se que digitou corretamente')
    }
  }

  async function handleOnPressDelete() {
    resetSummoner()
    await AsyncStorage.clear()
  }

  return (
    <View style={styles.container}>

      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.subTitle}>Antes de começarmos... preencha os campos abaixo com as informações</Text>
      </View>



      <View style={styles.inputsContainer}>

        <TextInput
          value={typingRegion}
          onChangeText={(text) => setTypingRegion(text)}
          style={[styles.textInput, {
            width: '20%',
            borderRightWidth: 1,
            borderColor: '#ffffff50'
          }]}
        />

        <TextInput
          value={typingName}
          placeholder="Seu nome de usuario"
          placeholderTextColor='#ffffff45'
          onChangeText={(text) => setTypingName(text)}
          style={styles.textInput}
        />

      </View>


      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.subTitle}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleOnPressDelete} style={styles.button}>
        <Text style={styles.subTitle}>Delete data</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32
  },
  subTitle: {
    color: '#ffffff60',
    fontWeight: 'bold',
    fontSize: 20
  },
  inputsContainer: {
    backgroundColor: '#ffffff10',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 12,
    width: '75%',
    height: 72,
    margin: 12
  },
  textInput: {
    color: '#ffffff70',
    padding: 12,
    fontSize: 18
  },
  button: {
    backgroundColor: '#ffffff10',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12
  }
})
