import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'

import * as Linking from 'expo-linking'

import { useSummoner } from '../../hooks/summoner'
import Riot from '../../services/riot'

import allChampions from '../../champions.json'
import colors from '../../colors'

import { getLocales } from 'expo-localization'


const FreeChampionsRotation: React.FC = () => {

  const { region, summoner } = useSummoner()
  const [champions, setChampions] = useState<any[]>([])


  useEffect(() => {
    if (!region || !summoner) return

    new Riot(region).getFreeChampionsIdRotation()
      .then(ids => {
        const champValues = Object.values(allChampions.data)
        const champions = ids.map(id => champValues.find(c => c.key == String(id)))
        setChampions(champions)
      })
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.cardHeader}>
        <Text style={styles.title}>Rotação de campeões</Text>
      </View>


      <FlatList
        style={styles.flatlist}
        contentContainerStyle={{ justifyContent: 'space-between' }}
        data={champions}
        renderItem={ChampionItem}
        keyExtractor={(item) => String(item.key)}
        numColumns={2}
      />
    </View>
  )
}

type ItemProps = {
  item: {
    name: string
    id: string
    key: number
  }
}

const ChampionItem = ({ item }: ItemProps) => {
  const [locale] = getLocales()

  const local = locale.languageTag.toLowerCase()

  function openChampionURL() {
    const url = `https://www.leagueoflegends.com/${local}/champions/${item.name.toLowerCase()}`
    Linking.openURL(url)
  }

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={openChampionURL}>

      <Image
        style={{ width: 48, height: 48 }}
        source={{
          uri: `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${item.id}.png`
        }}
      />

      <Text style={styles.championName}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff05',
    alignItems: 'center'
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold'
  },
  flatlist: {
    width: '100%'
  },
  itemContainer: {
    backgroundColor: '#ffffff05',
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginVertical: 4,
    marginHorizontal: '2.5%',
    borderRadius: 12,
    overflow: 'hidden'
  },
  championName: {
    padding: 8,
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default FreeChampionsRotation