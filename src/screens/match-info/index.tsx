import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Match, MatchParticipant } from '../../@types/riot'
import ParticipantFocusDetails from '../../components/cards/ParticipantFocusDetail'
import MatchParticipantInfo from '../../components/items/MatchParticipantInfo'
import Card from '../../components/ui/card'
import riotRegionFromLeague from '../../functions/riotRegionFromLeague'
import { useSummoner } from '../../hooks/useSummoner'
import { HistoryStackParamList } from '../../routes/history.routes'
import { expoToDateFnsLocale } from '../../functions/expoToDateFnsLocale'
import { getLocales } from 'expo-localization'
import { format } from 'date-fns'
import Title from '../../components/ui/title'
import Markdown from 'react-native-markdown-display'
import { useLeagueStats } from '../../hooks/useLeagueStats'
import { usePreferences } from '../../hooks/usePreferences'
import { styles, mdStyles } from './styles'
import { TeamKDA } from '../../components/generic/TeamKDA'

type matchInfoScreenProp = RouteProp<HistoryStackParamList, 'matchInfo'>

export default function MatchInfo() {
  const route = useRoute<matchInfoScreenProp>()

  const { leaguestats } = useLeagueStats()
  const { language } = usePreferences()
  const { summoner, leagueRegion } = useSummoner()

  const [match, setMatch] = useState<Match>()
  const [focusedParticipantPuuid, setFocusedParticipantPuuid] =
    useState<string>(summoner?.puuid ?? '')

  const [aiCoachText, setAiCoachText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    leaguestats
      .getMatchById(riotRegionFromLeague(leagueRegion), route.params?.matchId)
      .then((match) => setMatch(match))
  }, [summoner, leagueRegion])

  const analyzeMatch = async () => {
    if (!match || !summoner?.puuid || loading || !leagueRegion) return

    console.log('Analyzing match...')
    setLoading(true)

    const res = await leaguestats.analyzeMatch(
      riotRegionFromLeague(leagueRegion),
      match?.metadata.matchId ?? '',
      summoner.puuid,
      language,
    )

    setAiCoachText(res.content)
    setLoading(false)
  }

  const focusedParticipant =
    match?.info.participants.find((p) => p.puuid === focusedParticipantPuuid) ??
    ({} as MatchParticipant)

  const team1Won = match?.info.teams[0].win ?? true

  const [team1, team2] = useMemo(() => {
    const participants = match?.info?.participants ?? []
    const team1 = []
    const team2 = []

    for (const participant of participants) {
      if (participant.teamId == 100) {
        team1.push(participant)
      } else {
        team2.push(participant)
      }
    }

    return [team1, team2]
  }, [match])

  const matchDate = new Date(match?.info?.gameCreation ?? 0)

  const locale = expoToDateFnsLocale(getLocales()[0].languageTag)

  const matchDateTime = format(matchDate, 'Pp', { locale })

  if (!match) return <View style={styles.container}></View>

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <View style={styles.header}>
        <TeamKDA
          won={team1Won}
          participants={team1}
        />

        <Text style={styles.text}>
          {(match.info.gameDuration / 60).toFixed()}mins
        </Text>

        <TeamKDA
          won={!team1Won}
          participants={team2}
        />
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {team1.map((participant) => (
            <MatchParticipantInfo
              key={participant.puuid}
              participant={participant}
              focused={participant.puuid == focusedParticipantPuuid}
              onClick={() => setFocusedParticipantPuuid(participant.puuid)}
            />
          ))}
        </View>

        <View style={styles.team}>
          {team2.map((participant) => (
            <MatchParticipantInfo
              key={participant.puuid}
              participant={participant}
              focused={participant.puuid == focusedParticipantPuuid}
              onClick={() => setFocusedParticipantPuuid(participant.puuid)}
            />
          ))}
        </View>
      </View>

      <ParticipantFocusDetails
        participant={focusedParticipant}
        match={match}
      />

      <Card
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <Title>🤖 Coach AI</Title>

        <TouchableOpacity
          style={styles.button}
          onPress={analyzeMatch}
        >
          <Text style={styles.text}>Analyze</Text>
        </TouchableOpacity>

        <Card>
          <Markdown style={mdStyles}>
            {loading
              ? 'Please wait, we are analyzing your match...'
              : aiCoachText ?? 'Your analysis will appear here.'}
          </Markdown>
        </Card>
      </Card>

      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.subText}>{matchDateTime}</Text>

        <Text style={styles.subText}>Match id: {match.metadata.matchId}</Text>
      </Card>
    </ScrollView>
  )
}
