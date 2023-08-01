import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../colors'
import ChampionMastery from '../../entities/ChampionMastery'
import { useSummoner } from '../../hooks/summoner'
import Riot from '../../services/riot'
import ChampionMasteryCard from '../ChampionMastery'

import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import riot from '../../services/riot'

const MasteriesCard: React.FC = () => {
  const navigation = useNavigation()
  const { region, summoner } = useSummoner()

  const [maestries, setMaestries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    if (!region || !summoner) return
    riot.getSummonerChampionsMasteries(summoner?.id).then((maestries) => {
      if (!maestries) return
      setMaestries(
        maestries
          .sort((x, y) => y.championLevel - x.championLevel)
          ?.slice(0, 5),
      )
    })
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => navigation.navigate('bestChampions')}
      >
        <Text style={styles.title}>Melhores campeões</Text>

        <MaterialIcons
          name='chevron-right'
          size={28}
          color='#fff'
        />
      </TouchableOpacity>

      <View style={styles.maestries}>
        {maestries.map((mastery) => (
          <ChampionMasteryCard
            key={mastery.championId}
            mastery={mastery}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff05',
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff05',
  },
  maestries: {
    width: '95%',
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export default MasteriesCard
