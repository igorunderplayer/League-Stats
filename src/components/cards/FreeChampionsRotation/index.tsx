import * as Linking from 'expo-linking'
import { getLocales } from 'expo-localization'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChampionData } from '../../../@types/riot'
import colors from '../../../colors'
import { useSummoner } from '../../../hooks/useSummoner'
import riot from '../../../services/riot'

const FreeChampionsRotation: React.FC = () => {
  const { leagueRegion, summoner } = useSummoner()
  const [champions, setChampions] = useState<ChampionData[]>([])

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    riot.getFreeChampionsIdRotation(leagueRegion).then(async (ids) => {
      const allChampions = await riot.ddragon.getOrFetchChampions()
      const champValues = Object.values(allChampions)
      const champions = ids.map((id) =>
        champValues.find((c) => c.key == String(id)),
      ) as ChampionData[]
      setChampions(champions)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>Rotação de campeões</Text>
      </View>

      <View style={styles.flatlist}>
        {champions.map((champ) => (
          <ChampionItem
            key={champ.key}
            item={champ}
          />
        ))}
      </View>
    </View>
  )
}

type ItemProps = {
  item: ChampionData
}

const ChampionItem = ({ item }: ItemProps) => {
  const [locale] = getLocales()

  const local = locale.languageTag.toLowerCase()

  function openChampionURL() {
    const url = `https://www.leagueoflegends.com/${local}/champions/${item.name.toLowerCase()}`
    Linking.openURL(url)
  }

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={openChampionURL}
    >
      <Image
        style={{ width: 48, height: 48 }}
        source={{
          uri: riot.ddragon.getChampionIcon(item.id),
        }}
      />

      <Text style={styles.championName}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
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
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
  },
  flatlist: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  itemContainer: {
    backgroundColor: '#ffffff05',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: '49%',
  },
  championName: {
    padding: 8,
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default FreeChampionsRotation
