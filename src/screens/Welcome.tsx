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
import { leagueFromString } from '../@types/riot'
import { SelectMenu } from '../components/generic/SelectMenu'
import riotRegionFromLeague from '../functions/riotRegionFromLeague'
import { SummonerInfo, useSummoner } from '../hooks/useSummoner'
import riot from '../services/riot'
import themes from '../themes'

import { useTranslation } from 'react-i18next'

export default function Welcome() {
  const { savedSummoners, resetSummoner, addSummoner, getSummoner } =
    useSummoner()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('BR1')

  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()

  async function handleOnSearchSummonerPress() {
    if (loading) return
    setLoading(true)

    ToastAndroid.show(`Searching for ${typingName}...`, ToastAndroid.SHORT)
    try {
      const [name] = typingName.split('#')
      let [, tag] = typingName.split('#')

      if (!tag || !tag.length) {
        tag = typingRegion.toLowerCase()
      }

      const leagueRegion = leagueFromString(typingRegion.toUpperCase())
      const riotAccount = await riot.getAccountByRiotId(
        tag,
        name,
        riotRegionFromLeague(leagueRegion),
      )

      const summoner = await riot.getSummonerByPuuId(
        riotAccount.puuid,
        leagueRegion,
      )

      ToastAndroid.show(
        `Found summoner with name ${summoner.name}!`,
        ToastAndroid.SHORT,
      )

      getSummoner(leagueRegion, summoner.puuid)
      addSummoner(
        leagueRegion,
        summoner.puuid,
        `${riotAccount.gameName}#${riotAccount.tagLine}`,
      )
    } catch (e) {
      alert(
        'Não foi possivel recuperar a conta, certifique-se que digitou corretamente',
      )
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectSummoner(data: SummonerInfo) {
    if (loading) return
    setLoading(true)

    try {
      getSummoner(leagueFromString(data.leagueRegion.toUpperCase()), data.puuid)
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
        <Text style={styles.title}>{t('screen.welcome.welcome')}</Text>
        <Text style={styles.text}>{t('screen.welcome.subText')}</Text>
      </View>

      <View>
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
            placeholder={t('screen.welcome.input.riotID')}
            placeholderTextColor='#ffffff45'
            onChangeText={(text) => setTypingName(text)}
            style={styles.textInput}
          />
        </View>
        <SelectMenu
          text={t('screen.welcome.recentSummoners')}
          styles={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          onSelect={(item) => handleSelectSummoner(item.data as SummonerInfo)}
          items={savedSummoners.map((x) => ({
            text: x.name ?? t('common.unknownSummoner'),
            key: x.puuid,
            data: {
              name: x.name,
              leagueRegion: x.leagueRegion,
              puuid: x.puuid,
            },
          }))}
        />
      </View>

      <TouchableOpacity
        onPress={handleOnSearchSummonerPress}
        style={styles.button}
      >
        <Text style={styles.text}>Continuar</Text>
      </TouchableOpacity>

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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#ffffff50',
    borderBottomWidth: 1,
    width: '75%',
  },
  textInput: {
    color: '#ffffff70',
    padding: 12,
    fontSize: 18,
    width: '75%',
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
