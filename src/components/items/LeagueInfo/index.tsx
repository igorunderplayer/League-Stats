import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, View } from 'react-native'
import { LeagueEntry } from '../../../@types/riot'
import colors from '../../../colors'

type Props = {
  league: LeagueEntry
}

const LeagueInfo: React.FC<Props> = ({ league }) => {
  const { t } = useTranslation()

  const winrate = ((league.wins / (league.wins + league.losses)) * 100).toFixed(
    1,
  )

  const leagueTitle = t(`league.leagueTier.${league.tier}`)

  return (
    <View style={styles.container}>
      <Image
        style={styles.leagueIcon}
        source={{
          uri: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${league.tier?.toLowerCase()}.png`,
        }}
      />

      <View style={styles.leagueInfo}>
        <Text style={styles.title}>
          {leagueTitle} {league.rank}
        </Text>
        <Text style={styles.text}>
          {t(`league.queueType.${league.queueType}`)}
        </Text>
        <Text></Text>
        <Text style={styles.text}>
          {t('league.pdl')}: {league.leaguePoints}
        </Text>
        <View style={styles.winrate}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={styles.text}>{t('common.victory')}:</Text>
            <Text style={{ color: colors.softCyan, fontWeight: 'bold' }}>
              {league.wins}
            </Text>
          </View>
          <Text style={styles.text}>({winrate}%)</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Text style={styles.text}>{t('common.defeat')}:</Text>
          <Text style={{ color: colors.softRed, fontWeight: 'bold' }}>
            {league.losses}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
    gap: 12,
  },
  leagueInfo: {
    flexDirection: 'column',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#ffffff60',
  },
  leagueIcon: {
    width: 256,
    height: 256,
    marginVertical: -64,
    marginHorizontal: -72,
  },
  winrate: {
    flexDirection: 'row',
    gap: 12,
  },
})

export default LeagueInfo
