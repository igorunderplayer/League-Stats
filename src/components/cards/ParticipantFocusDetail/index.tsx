import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import {
  DDragonChampionsRaw,
  Match,
  MatchParticipant,
} from '../../../@types/riot'
import riot from '../../../services/riot'
import SimpleKDA from '../../generic/SimpleKDA'
import styles from './styles'

type Props = {
  participant: MatchParticipant
  match: Match
}

const ParticipantFocusDetails: React.FC<Props> = ({ participant, match }) => {
  const [championsData, setChampionsData] = useState<DDragonChampionsRaw>({})
  const champion = championsData[participant.championName] ?? {}

  useEffect(() => {
    getChampionsData()
  }, [])

  async function getChampionsData() {
    const data = await riot.ddragon.getOrFetchChampions()
    setChampionsData(data)
  }

  const csScore =
    participant.totalMinionsKilled + participant.neutralMinionsKilled

  const csPerMin = csScore / (match.info.gameDuration / 60)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 72, height: 72 }}
          source={{
            uri: riot.ddragon.getChampionIcon(champion.id),
          }}
        />

        <View>
          <Text style={styles.title}>{participant.championName}</Text>
          <Text style={styles.text}>{participant.summonerName}</Text>
        </View>

        <View style={styles.column}>
          <SimpleKDA
            kills={participant.kills}
            assists={participant.assists}
            deaths={participant.deaths}
          />

          <Text style={styles.text}>
            {csScore}CS{' '}
            <Text style={styles.subText}>({csPerMin.toFixed(1)}/min)</Text>
          </Text>
        </View>

        <View style={styles.column}>
          <Image
            style={{ width: 48, height: 48 }}
            source={{
              uri: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-${participant.teamPosition?.toLowerCase()}.png`,
            }}
          />

          <Text style={styles.subText}>{participant.teamPosition}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.text}>
          Dano causado: {participant.totalDamageDelt}
        </Text>
      </View>
    </View>
  )
}

export default ParticipantFocusDetails
