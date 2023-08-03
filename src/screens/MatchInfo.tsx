import { useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Match, MatchParticipant } from '../@types/riot'
import colors from '../colors'
import ParticipantFocusDetails from '../components/cards/ParticipantFocusDetail'
import MatchParticipantInfo from '../components/items/MatchParticipantInfo'
import { useSummoner } from '../hooks/summoner'
import riot from '../services/riot'
import themes from '../themes'

export default function MatchInfo() {
  const route = useRoute()
  const { summoner, region } = useSummoner()
  const [match, setMatch] = useState<Match>()
  const [focusedParticipantPuuid, setFocusedParticipantPuuid] =
    useState<string>('')

  const focusedParticipant =
    match?.info.participants.find((p) => p.puuid === focusedParticipantPuuid) ??
    ({} as MatchParticipant)

  useEffect(() => {
    if (!region || !summoner) return
    riot.getMatchById(route.params?.matchId).then((match) => {
      setMatch(match)
      setFocusedParticipantPuuid(match.info.participants[0].puuid)
    })
  }, [])

  const team1Won = match?.info.teams[0].win

  const team1Kda = useMemo(
    () =>
      match?.info.participants
        .filter((p) => p.teamId == 100)
        .reduce(
          (prev, curr) => {
            return {
              kills: prev.kills + curr.kills,
              deaths: prev.deaths + curr.deaths,
              assists: prev.assists + curr.assists,
            }
          },
          { kills: 0, deaths: 0, assists: 0 },
        ),
    [match],
  )

  const team2Kda = useMemo(
    () =>
      match?.info.participants
        .filter((p) => p.teamId == 200)
        .reduce(
          (prev, curr) => {
            return {
              kills: prev.kills + curr.kills,
              deaths: prev.deaths + curr.deaths,
              assists: prev.assists + curr.assists,
            }
          },
          { kills: 0, deaths: 0, assists: 0 },
        ),
    [match],
  )

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
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <View style={styles.team}>
          <View style={styles.heading}>
            <Text
              style={[
                styles.text,
                { color: team1Won ? colors.softCyan : colors.softRed },
              ]}
            >
              {team1Won ? 'Vitória' : 'Derrota'}
            </Text>

            <Text style={styles.subText}>
              {team1Kda?.kills} / {team1Kda?.deaths} / {team1Kda?.assists}
            </Text>
          </View>

          {match.info.participants
            .filter((p) => p.teamId == 100)
            .map((participant) => (
              <MatchParticipantInfo
                key={participant.summonerName}
                participant={participant}
                match={match}
                onClick={() => setFocusedParticipantPuuid(participant.puuid)}
              />
            ))}
        </View>

        <View style={styles.team}>
          <View style={styles.heading}>
            <Text
              style={[
                styles.text,
                { color: !team1Won ? colors.softCyan : colors.softRed },
              ]}
            >
              {!team1Won ? 'Vitória' : 'Derrota'}
            </Text>

            <Text style={styles.subText}>
              {team2Kda?.kills} / {team2Kda?.deaths} / {team2Kda?.assists}
            </Text>
          </View>

          {match.info.participants
            .filter((p) => p.teamId == 200)
            .map((participant) => (
              <MatchParticipantInfo
                key={participant.summonerName}
                participant={participant}
                match={match}
                onClick={() => setFocusedParticipantPuuid(participant.puuid)}
              />
            ))}
        </View>
      </View>

      <ParticipantFocusDetails participant={focusedParticipant} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    padding: 8,
  },
  team: {
    gap: 4,
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: '#ffffff80',
    fontWeight: 'bold',
  },
})
