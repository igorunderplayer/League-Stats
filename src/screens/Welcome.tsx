import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { SummonerInfo, useSummoner } from '../hooks/useSummoner'
import riot from '../services/riot'
import themes from '../themes'

export default function Welcome() {
  const { savedSummoners, resetSummoner, addSummoner, getSummoner } =
    useSummoner()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('BR1')

  const [loading, setLoading] = useState(false)

  const [selectOpen, setSelectOpen] = useState(false)

  async function handleOnSearchSummonerPress() {
    if (loading) return

    setLoading(true)

    ToastAndroid.show(`Searching for ${typingName}...`, ToastAndroid.SHORT)
    try {
      const summoner = await riot.getSummonerByName(
        typingName,
        typingRegion.toLowerCase(),
      )

      ToastAndroid.show(
        `Found summoner with name ${summoner.name}!`,
        ToastAndroid.SHORT,
      )

      addSummoner(typingName, typingRegion)
      getSummoner(typingName, typingRegion)
    } catch (e) {
      alert(
        'Não foi possivel recuperar a conta, certifique-se que digitou corretamente',
      )
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectSummoner(info: SummonerInfo) {
    if (loading) return
    setLoading(true)
    try {
      getSummoner(info.name, info.region)
    } catch (e) {
      alert('Não foi possivel recuperar a conta')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleOnPressDelete() {
    resetSummoner()
    await AsyncStorage.clear()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.text}>
          Antes de começarmos... preencha os campos abaixo com as informações
        </Text>
      </View>

      <View style={styles.inputsContainer}>
        <TextInput
          value={typingRegion}
          onChangeText={(text) => setTypingRegion(text)}
          style={[
            styles.textInput,
            {
              width: '20%',
              borderRightWidth: 1,
              borderColor: '#ffffff50',
            },
          ]}
        />

        <TextInput
          value={typingName}
          placeholder='Seu nome de usuario'
          placeholderTextColor='#ffffff45'
          onChangeText={(text) => setTypingName(text)}
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity
        onPress={handleOnSearchSummonerPress}
        style={styles.button}
      >
        <Text style={styles.text}>Continuar</Text>
      </TouchableOpacity>

      <View>{selectOpen ? <></> : null}</View>

      {/* <View style={{ gap: 8, alignItems: 'center' }}>
        <Text style={styles.subTitle}>Summoners recentes</Text>
        {savedSummoners.map((x) => (
          <View
            style={styles.inputsContainer}
            key={x.name + x.region}
          >
            <TouchableOpacity
              onPress={() => handleSelectSummoner(x)}
              style={[
                styles.textInput,
                {
                  borderRightWidth: 1,
                  borderColor: '#ffffff20',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            >
              <Text style={styles.textInput}>{x.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.textInput,
                { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              ]}
            >
              <MaterialCommunityIcons
                name='trash-can'
                color='#ffffff20'
                size={48}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View> */}

      <TouchableOpacity
        onPress={handleOnPressDelete}
        style={styles.button}
      >
        <Text style={styles.text}>Delete data</Text>
      </TouchableOpacity>
    </ScrollView>
  )
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
    fontSize: 32,
  },
  subTitle: {
    color: '#ffffff95',
    fontWeight: 'bold',
    fontSize: 26,
  },
  text: {
    color: '#ffffff60',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputsContainer: {
    backgroundColor: '#ffffff10',
    flexDirection: 'row',
    borderRadius: 12,
    width: '75%',
  },
  textInput: {
    color: '#ffffff70',
    padding: 12,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#ffffff10',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
