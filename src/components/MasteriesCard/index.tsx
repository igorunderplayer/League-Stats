import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../colors'
import ChampionMastery from '../../entities/ChampionMastery'
import { useSummoner } from '../../hooks/summoner'
import Riot from '../../services/riot'
import ChampionMasteryCard from '../ChampionMastery'

const MasteriesCard: React.FC = () => {
  const { region, summoner } = useSummoner()

  const [maestries, setMaestries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    if (!region || !summoner) return
    new Riot(region).getSummonerChampionsMasteries(summoner?.id)
      .then(maestries => {
        if (!maestries) return
        setMaestries(maestries?.slice(0, 5))
      })
  }, [])

  console.log(maestries)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Melhores campeões</Text>

      <View style={styles.maestries}>
        {maestries.map(mastery => (<ChampionMasteryCard key={mastery.championId} mastery={mastery} />))}
      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff05',
    alignItems: 'center'
  },
  maestries: {
    width: '95%'
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold'
  }
})

export default MasteriesCard