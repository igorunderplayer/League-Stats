import { View, Text, StyleSheet, Image } from 'react-native'
import { Match, MatchParticipant } from '../../@types/riot'

import ParticipantItems from '../ParticipantItems'
import SimpleKDA from '../SimpleKDA'

import spells from '../../spells.json'
import runes from '../../runes.json'
import colors from '../../colors'


type Props = {
  match: Match
  participant: MatchParticipant
}

const nameFilter = {
  'FiddleSticks': 'Fiddlesticks',
}

const MatchParticipantInfo: React.FC<Props> = ({ match, participant }) => {
  const primaryMainRune = participant.perks.styles[0].selections[0].perk
  const runeIconPath = runes.find(rune => rune.id == primaryMainRune)?.icon.toLowerCase() ?? ''

  const spell1 = spells.find(spell => spell.id == participant.summoner1Id)
  const spell2 = spells.find(spell => spell.id == participant.summoner2Id)

  const csScore = participant.totalMinionsKilled + participant.neutralMinionsKilled

  const formatter = new Intl.NumberFormat('en-US',{ notation: 'compact' })
  const totalGold = formatter.format(participant.goldEarned)

  // For some reason there are some champs that come with wrong formatting
  const nameFiltered = !nameFilter[participant.championName as keyof typeof nameFilter] ?
    participant.championName :
    nameFilter[participant.championName as keyof typeof nameFilter]

  return (
    <View style={styles.container}>


      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={styles.basicImageInfos}>
          <Image
            style={{ width: 48, height: 48, borderTopLeftRadius: 12, borderTopRightRadius: 12, marginRight: 12 }}
            source={{
              uri: `http://ddragon.leagueoflegends.com/cdn/13.11.1/img/champion/${nameFiltered}.png`
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

        <Text style={styles.text}>{totalGold} ouro</Text>
        <Text style={styles.text}>{csScore} CS</Text>
        <Text style={styles.text}>{participant.visionScore} vis.</Text>


      </View>

      <View style={styles.basicPlayerInfo}>
        <Text style={styles.name}>{participant.summonerName}</Text>

        <SimpleKDA kills={participant.kills} deaths={participant.deaths} assists={participant.assists} textSize={14} bold={false} />

        <ParticipantItems items={[
          { item: participant.item0, slot: 0 },
          { item: participant.item1, slot: 1 },
          { item: participant.item2, slot: 2 },
          { item: participant.item3, slot: 3 },
          { item: participant.item4, slot: 4 },
          { item: participant.item5, slot: 5 },
          { item: participant.item6, slot: 6 },
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
    padding: 8,
    justifyContent: 'space-evenly'
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