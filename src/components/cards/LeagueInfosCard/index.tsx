import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LeagueEntry } from '../../../@types/riot'
import colors from '../../../colors'
import { useSummoner } from '../../../hooks/useSummoner'
import riot from '../../../services/riot'
import LeagueInfo from '../../items/LeagueInfo'

const LeagueInfosCard: React.FC = () => {
  const { region, summoner } = useSummoner()

  const [leagues, setLeagues] = useState<LeagueEntry[]>([])

  useEffect(() => {
    if (!region || !summoner) return
    riot.getSummonerLeague(summoner?.id).then((leagues) => {
      setLeagues(leagues.filter((l) => l.queueType != 'CHERRY'))
    })
  }, [])

  if (!leagues?.length) return <></>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classificação pessoal</Text>

      {leagues.map((league) => (
        <LeagueInfo
          key={league.queueType}
          league={league}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 8,
    borderRadius: 12,
    flexDirection: 'column',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 8,
  },
})

export default LeagueInfosCard
