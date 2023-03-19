import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LeagueEntry } from '../../@types/riot'
import colors from '../../colors'
import { useSummoner } from '../../hooks/summoner'
import Riot from '../../services/riot'
import LeagueInfo from '../LeagueInfo'

const LeagueInfosCard: React.FC = () => {
  const navigation = useNavigation()
  const { region, summoner } = useSummoner()

  const [leagues, setLeagues] = useState<LeagueEntry[]>([])

  useEffect(() => {
    if (!region || !summoner) return
    new Riot(region).getSummonerLeague(summoner?.id)
      .then(leagues => {
        console.log(leagues)
        setLeagues(leagues)
      })
  }, [])

  if (!leagues?.length) return <></>

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Classificação pessoal</Text>
      
      {leagues.map(league => (
        <LeagueInfo league={league} />
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
    gap: 12
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 8
  }
})

export default LeagueInfosCard