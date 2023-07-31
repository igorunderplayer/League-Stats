import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Match } from '../@types/riot'
import colors from '../colors'
import MatchParticipantInfo from '../components/MatchParticipantInfo'
import { useSummoner } from '../hooks/summoner'
import themes from '../themes'
import riot from '../services/riot'

export default function MatchInfo() {
  const route = useRoute()
  const navigation = useNavigation()
  const { summoner, region } = useSummoner()

  const [match, setMatch] = useState<Match>()

  useEffect(() => {
    if (!region || !summoner) return
    riot.getMatchById(route.params?.matchId).then((match) => {
      setMatch(match)
    })
  }, [])

  const team1Won = match?.info.teams[0].win

  const team1Kda = match?.info.participants
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
    )

  const team2Kda = match?.info.participants
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
    )

  if (!match) return <View style={styles.container}></View>

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
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
              />
            ))}
        </View>
      </View>
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
