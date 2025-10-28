import * as Linking from 'expo-linking'
import { getLocales } from 'expo-localization'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, View } from 'react-native'
import { List, TouchableRipple, Text } from 'react-native-paper'
import { ChampionData } from '../../../@types/riot'
import { useSummoner } from '../../../hooks/useSummoner'
import Card from '../../ui/card'
import Title from '../../ui/title'
import { useLeagueStats } from '../../../hooks/useLeagueStats'
import ddragon from '../../../services/ddragon'

const FreeChampionsRotation: React.FC = () => {
  const { leagueRegion, summoner } = useSummoner()
  const [champions, setChampions] = useState<ChampionData[]>([])

  const { leaguestats } = useLeagueStats()

  const { t } = useTranslation()

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    try {
      leaguestats.getFreeChamopionRotation(leagueRegion).then(async (ids) => {
        const allChampions = await ddragon.getOrFetchChampions()
        const champValues = Object.values(allChampions)
        const champions = ids.map((id) =>
          champValues.find((c) => c.key == String(id)),
        ) as ChampionData[]
        setChampions(champions)
      })
    } catch {
      alert('Could not fetch free champion rotation')
    }
  }, [])

  return (
    <Card style={styles.container}>
      <View style={styles.cardHeader}>
        <Title>{t('league.championRotation')}</Title>
      </View>

      <View style={styles.flatlist}>
        {champions.map((champ) => (
          <ChampionItem
            key={champ.key}
            item={champ}
          />
        ))}
      </View>
    </Card>
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
    <TouchableRipple
      style={styles.itemContainer}
      onPress={openChampionURL}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={{
            uri: ddragon.getChampionIcon(item.id),
          }}
        />

        <Text
          variant="titleMedium"
          style={styles.championName}
        >
          {item.name}
        </Text>
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  flatlist: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  itemContainer: {
    backgroundColor: '#ffffff05',
    borderRadius: 12,
    width: '49%',
  },
  championName: {
    padding: 8,
    fontWeight: 'bold',
  },
})

export default FreeChampionsRotation
