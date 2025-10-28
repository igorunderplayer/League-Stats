import React, { useState } from 'react'
import {
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Button, TextInput, Text, IconButton } from 'react-native-paper'
import { leagueFromString } from '../../@types/riot'
import { SelectMenu } from '../../components/generic/SelectMenu'
import { SummonerInfo, useSummoner } from '../../hooks/useSummoner'
import themes from '../../themes'
import { useTranslation } from 'react-i18next'
import getRiotIdFromString from '../../functions/ritoIdFromString'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { WelcomeStackParamList } from '../../routes/welcome.routes'
import { useNavigation } from '@react-navigation/native'
import { usePreferences } from '../../hooks/usePreferences'
import { useLeagueStats } from '../../hooks/useLeagueStats'

import { styles } from './styles'

type welcomeScreenProp = NativeStackNavigationProp<
  WelcomeStackParamList,
  'welcome'
>

export default function Welcome() {
  const { primaryColor } = usePreferences()

  const { leaguestats } = useLeagueStats()
  const { savedSummoners, addSummoner, getSummoner } = useSummoner()

  const navigation = useNavigation<welcomeScreenProp>()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('BR1')

  const [loading, setLoading] = useState(false)

  const [selectOpen, setSelectOpen] = useState(true)

  const { t } = useTranslation()

  async function handleOnSearchSummonerPress() {
    if (loading) return
    setLoading(true)

    ToastAndroid.show(`Searching for ${typingName}...`, ToastAndroid.SHORT)
    try {
      const riotId = getRiotIdFromString(typingName)

      if (!riotId.tag || !riotId.tag.length) {
        riotId.tag = typingRegion.toLowerCase()
      }

      const leagueRegion = leagueFromString(typingRegion.toUpperCase())

      const { account, summoner } = await leaguestats.getSummonerByRiotId(
        leagueRegion,
        riotId.name,
        riotId.tag,
      )

      if (!account || !summoner) {
        return
      }

      ToastAndroid.show(
        `Found summoner with name ${summoner.name}!`,
        ToastAndroid.SHORT,
      )

      getSummoner(leagueRegion, summoner.puuid)
      addSummoner(
        leagueRegion,
        summoner.puuid,
        `${account.gameName}#${account.tagLine}`,
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themes.dark.background,
        paddingVertical: 32,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.title}>{t('screen.welcome.welcome')}</Text>
          <Text style={styles.subTitle}>{t('screen.welcome.subText')}</Text>
        </View>

        <View>
          <View style={styles.inputsContainer}>
            <TextInput
              value={typingRegion}
              placeholder={t('screen.welcome.input.region')}
              onChangeText={(text) => setTypingRegion(text)}
              mode="outlined"
              style={{
                width: '30%',
                backgroundColor: themes.dark.surface,
              }}
            />

            <TextInput
              value={typingName}
              placeholder={t('screen.welcome.input.riotID')}
              onChangeText={(text) => setTypingName(text)}
              mode="outlined"
              style={{ flex: 1, backgroundColor: themes.dark.surface }}
            />
          </View>
          <SelectMenu
            open={selectOpen}
            onPress={() => setSelectOpen((val) => !val)}
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

        <View>
          <Button
            mode="contained"
            onPress={handleOnSearchSummonerPress}
            loading={loading}
            disabled={loading}
            style={{ marginTop: 16 }}
          >
            {t('screen.welcome.continue')}
          </Button>
        </View>
      </ScrollView>

      <IconButton
        icon="settings"
        size={32}
        mode="contained"
        onPress={() => navigation.navigate('settings')}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </View>
  )
}
