import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../../colors'
import ChampionMastery from '../../../entities/ChampionMastery'
import { useSummoner } from '../../../hooks/useSummoner'
import { ProfileStackParamList } from '../../../screens/Profile'
import riot from '../../../services/riot'
import ChampionMasteryCard from '../../items/ChampionMastery'

type profileScreenProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'profileDefault'
>

const MasteriesCard: React.FC = () => {
  const navigation = useNavigation<profileScreenProp>()
  const { leagueRegion, summoner } = useSummoner()

  const [maestries, setMaestries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    if (!leagueRegion || !summoner) return
    riot
      .getSummonerChampionsMasteries(summoner?.puuid, leagueRegion)
      .then((maestries) => {
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
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 16,
    gap: 8,
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export default MasteriesCard
