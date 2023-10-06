import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../../colors'
import ChampionMastery from '../../../entities/ChampionMastery'

import { getLocales } from 'expo-localization'

import { ChampionData } from '../../../@types/riot'
import riot from '../../../services/riot'

type Props = {
  mastery: ChampionMastery
}

const ChampionMasteryCard: React.FC<Props> = ({ mastery }) => {
  const [champion, setChampion] = useState<ChampionData>({} as ChampionData)
  const [locale] = getLocales()

  useEffect(() => {
    findChampion()
  }, [])

  const findChampion = async () => {
    const champions = await riot.ddragon.getOrFetchChampions()
    const values = Object.values(champions)
    setChampion(
      values.find(
        (champ) => champ.key == String(mastery.championId),
      ) as ChampionData,
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.basicInfo}>
        <Image
          style={styles.championIcon}
          source={{
            uri: riot.ddragon.getChampionIcon(champion.id),
          }}
        />

        <Text style={styles.name}>{champion.name}</Text>
      </View>

      <View style={styles.masteryPoints}>
        <Image
          style={{ width: 48, height: 48 }}
          source={{
            uri:
              mastery.championLevel < 4
                ? `https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_default.png`
                : `https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_${mastery.championLevel}.png`,
          }}
        />

        <Text style={styles.subText}>
          {mastery.championPoints
            .toString()
            .replace(
              /\B(?=(\d{3})+(?!\d))/g,
              locale.digitGroupingSeparator ?? '',
            )}{' '}
          pontos
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    padding: 12,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  championIcon: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  basicInfo: {
    flexDirection: 'row',
  },
  masteryPoints: {
    alignItems: 'center',
  },
})

export default ChampionMasteryCard
