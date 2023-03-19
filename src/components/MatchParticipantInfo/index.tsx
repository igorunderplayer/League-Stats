import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Match, MatchParticipant } from '../../@types/riot'
import colors from '../../colors'
import Summoner from '../../entities/Summoner'
import { useSummoner } from '../../hooks/summoner'
import Riot from '../../services/riot'

import spells from '../../spells.json'
import runes from '../../runes.json'
import SimpleKDA from '../SimpleKDA'
import ParticipantItems from '../ParticipantItems'


type Props = {
  match: Match
  participant: MatchParticipant
}

const MatchParticipantInfo: React.FC<Props> = ({ match, participant }) => {
  const { region } = useSummoner()
  const [summoner, setSummoner] = useState<Summoner>({} as Summoner)

  useEffect(() => {
    if(!region) return
    new Riot(match.info.platformId).getSummonerByName(participant.summonerName)
      .then(summonerData => {
        setSummoner(summonerData)
      })

  }, [])

  const primaryMainRune = participant.perks.styles[0].selections[0].perk

  const runeIconPath = runes.find(rune => rune.id == primaryMainRune)?.icon.toLowerCase() ?? ''

  const spell1 = spells.find(spell => spell.id == participant.summoner1Id)
  const spell2 = spells.find(spell => spell.id == participant.summoner2Id)

  return (
    <View style={styles.container}>


      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={styles.basicImageInfos}>
          <Image
            style={{ width: 48, height: 48, borderTopLeftRadius: 12, borderTopRightRadius: 12, marginRight: 12 }}
            source={{
              uri: `http://ddragon.leagueoflegends.com/cdn/13.5.1/img/champion/${participant.championName}.png`
            }}
          />

          

          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 16, height: 16, borderBottomLeftRadius: 12 }}
              source={{
                uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${runeIconPath}`
              }}
            />

            <View style={{ backgroundColor: '#00000045', position: 'absolute', top: -12, left: -11, zIndex: 1, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 11, color: '#fff' }}>{participant.champLevel}</Text>
            </View>

            <Image
              style={{ width: 16, height: 16 }}
              source={{
                uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/${spell1?.iconPath.toLowerCase()}`
              }}
            />

            <Image
              style={{ width: 16, height: 16, borderBottomRightRadius: 12 }}
              source={{
                uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/${spell2?.iconPath.toLowerCase()}`
              }}
            />

          </View>
        </View>

        <Text style={styles.text}>
            {participant.role == 'SUPPORT' ? `${participant.visionScore} vis.` : `${participant.totalMinionsKilled} CS`}
          </Text>

      </View>

      <View style={styles.basicPlayerInfo}>
        <Text style={styles.name}>{participant.summonerName}</Text>

        <SimpleKDA kills={participant.kills} deaths={participant.deaths} assists={participant.assists} textSize={14} bold={false} />

        <ParticipantItems items={[
          participant.item0,
          participant.item1,
          participant.item2,
          participant.item3,
          participant.item4,
          participant.item5,
          participant.item6
        ]}/>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    borderRadius: 12,
    padding: 8
  },
  basicImageInfos: {
    flexDirection: 'column'
  },
  basicPlayerInfo: {
    flexDirection: 'column'
  },
  name: {
    color: colors.white,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
    color: '#ffffff60'
  }
})

export default MatchParticipantInfo