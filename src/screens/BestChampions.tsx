import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../colors';
import ChampionMasteryCard from '../components/ChampionMastery';
import ChampionMastery from '../entities/ChampionMastery';
import { useSummoner } from '../hooks/summoner';
import Riot from '../services/riot';
import themes from '../themes';
import riot from '../services/riot';

export default function BestChampions() {
  const navigation = useNavigation()
  const { summoner, region } = useSummoner()

  const [maestries, setMaestries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    if (!region || !summoner) return
    riot.getSummonerChampionsMasteries(summoner?.id)
      .then(maestries => {
        if (!maestries) return
        setMaestries(maestries.sort((x, y) => y.championLevel - x.championLevel))
      })
  }, [])

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Todos campeões</Text>

      <ScrollView style={styles.maestries}>
        {maestries.map(mastery => (<ChampionMasteryCard key={mastery.championId} mastery={mastery} />))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontWeight: 'bold'
  },
  maestries: {
    width: '95%'
  },
})
