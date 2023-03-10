import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../../colors'
import { useSummoner } from '../../hooks/summoner'

import runes from '../../runes.json'
import spells from '../../spells.json'

interface MatchParticipant {

}

interface Match {
  metadata: {
    matchId: string
  },
  info: {
    gameMode: string
    participants: any[]
    gameDuration: number
  }
}

type Props = {
  match: Match
}

const MatchInfoCard: React.FC<Props> = ({ match }) => {

  const { summoner } = useSummoner()

  const me = match.info.participants.find(p => p.puuid == summoner?.puuid)

  const primaryMainRune = me.perks.styles[0].selections[0].perk

  const runeIconPath = runes.find(rune => rune.id == primaryMainRune)?.icon.toLowerCase() ?? ''

  const spell1 = spells.find(spell => spell.id == me.summoner1Id)
  const spell2 = spells.find(spell => spell.id == me.summoner2Id)

  const gameMode = {
    "ARAM": "ARAM",
    "CLASSIC": "Normal",
    "URF": "Ultra rapido e furioso"
  }

  return (
    <View style={styles.container}>
      <View style={[styles.leftBar, { backgroundColor: me.win ? colors.softCyan : colors.softRed }]} />

      <View style={styles.basicInfo}>
        <Image
          style={{ width: 72, height: 72, borderTopLeftRadius: 12, borderTopRightRadius: 12, marginRight: 12 }}
          source={{
            uri: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${me.championName}.png`
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 24, height: 24, borderBottomLeftRadius: 12 }}
            source={{
              uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${runeIconPath}`
            }}
          />

          <Image
            style={{ width: 24, height: 24 }}
            source={{
              uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/${spell1?.iconPath.toLowerCase()}`
            }}
          />

          <Image
            style={{ width: 24, height: 24, borderBottomRightRadius: 12 }}
            source={{
              uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/${spell2?.iconPath.toLowerCase()}`
            }}
          />

        </View>
      </View>


      <View style={{ alignItems: 'center' }}>

        <View style={[styles.name, styles.winStatus, { flexDirection: 'row', backgroundColor: '#ffffff05' }]}>
          <Text style={{
            fontWeight: me.win ? 'bold' : 'normal',
            fontSize: 18,
            color: me.win ? colors.softCyan : '#ffffff70'
          }}> V </Text>

          <Text style={{ color: '#fff', fontSize: 18 }}>/</Text>

          <Text style={{
            fontWeight: !me.win ? 'bold' : 'normal',
            fontSize: 18,
            color: !me.win ? colors.softRed : '#ffffff70'
          }}> D </Text>
        </View>

        <Text style={[styles.subText, { fontWeight: 'bold', maxWidth: 96, textAlign: 'center' }]}>{gameMode[match.info.gameMode]}</Text>

        <Text style={styles.subText}>{(match.info.gameDuration / 60).toFixed()} min</Text>


      </View>


      <View style={{ alignItems: 'center' }}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.name, { color: colors.softCyan }]}>{me.kills}</Text>
          <Text style={[styles.name]}> / </Text>
          <Text style={[styles.name, { color: colors.softRed }]}>{me.deaths}</Text>
          <Text style={[styles.name]}> / </Text>
          <Text style={[styles.name, { color: colors.softOrange }]}>{me.assists}</Text>
        </View>

        <Text style={styles.subText}>50% atua????o abates</Text>
        <Text style={styles.subText}>{me.totalMinionsKilled} CS</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  leftBar: {
    left: 0,
    height: '95%',
    width: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute'
  },
  winStatus: {
    borderRadius: 12
  },
  name: {
    padding: 4,
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  subText: {
    color: '#ffffff60'
  },
  championIcon: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2
  },
  basicInfo: {
    flexDirection: 'column'
  },
  masteryPoints: {
    alignItems: 'center'
  }
})

export default MatchInfoCard