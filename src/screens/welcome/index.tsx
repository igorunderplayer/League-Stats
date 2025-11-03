import React, { useState } from 'react'
import { ScrollView, ToastAndroid, View } from 'react-native'
import {
  Button,
  TextInput,
  Text,
  IconButton,
  Surface,
  Divider,
} from 'react-native-paper'
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

type welcomeScreenProp = NativeStackNavigationProp<
  WelcomeStackParamList,
  'welcome'
>

export default function Welcome() {
  const { leaguestats } = useLeagueStats()
  const { savedSummoners, addSummoner, getSummoner } = useSummoner()

  const navigation = useNavigation<welcomeScreenProp>()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('BR1')

  const [loading, setLoading] = useState(false)

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
    <Surface
      style={{
        flex: 1,
        backgroundColor: themes.dark.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 24,
        }}
      >
        {/* Header Section */}
        <View style={{ alignItems: 'center', gap: 8, paddingVertical: 32 }}>
          <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>
            {t('screen.welcome.welcome')}
          </Text>
          <Text variant="bodyLarge" style={{ opacity: 0.7, textAlign: 'center' }}>
            {t('screen.welcome.subText')}
          </Text>
        </View>

        {/* Search Card */}
        <Surface
          elevation={1}
          style={{
            borderRadius: 16,
            padding: 16,
            gap: 16,
          }}
        >
          <Text variant="titleMedium">{t('screen.welcome.input.riotID')}</Text>
          
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              value={typingRegion}
              placeholder={t('screen.welcome.input.region')}
              onChangeText={(text) => setTypingRegion(text)}
              mode="outlined"
              style={{ flex: 1 }}
              dense
            />
            <TextInput
              value={typingName}
              placeholder="Summoner#TAG"
              onChangeText={(text) => setTypingName(text)}
              mode="outlined"
              style={{ flex: 3 }}
              dense
            />
          </View>

          <Button
            mode="contained"
            onPress={handleOnSearchSummonerPress}
            loading={loading}
            disabled={loading}
            icon="magnify"
          >
            {t('screen.welcome.continue')}
          </Button>
        </Surface>

        {/* Recent Summoners Section */}
        {savedSummoners.length > 0 && (
          <Surface
            elevation={1}
            style={{
              borderRadius: 16,
              padding: 16,
              gap: 8,
            }}
          >
            <Text variant="titleMedium">{t('screen.welcome.recentSummoners')}</Text>
            <Divider style={{ marginVertical: 8 }} />
            
            {savedSummoners.map((summoner) => (
              <Button
                key={summoner.puuid}
                mode="outlined"
                onPress={() => handleSelectSummoner(summoner)}
                disabled={loading}
                icon="account"
                contentStyle={{ justifyContent: 'flex-start' }}
              >
                {summoner.name ?? t('common.unknownSummoner')}
              </Button>
            ))}
          </Surface>
        )}
      </ScrollView>

      {/* Settings FAB */}
      <IconButton
        icon="settings"
        mode="contained"
        size={28}
        onPress={() => navigation.navigate('settings')}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </Surface>
  )
}
