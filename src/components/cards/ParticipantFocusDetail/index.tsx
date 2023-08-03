import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { DDragonChampionsRaw, MatchParticipant } from '../../../@types/riot'
import riot from '../../../services/riot'
import SimpleKDA from '../../generic/SimpleKDA'
import styles from './styles'

type Props = {
  participant: MatchParticipant
}

const ParticipantFocusDetails: React.FC<Props> = ({ participant }) => {
  const [championsData, setChampionsData] = useState<DDragonChampionsRaw>({})

  const champion = championsData[participant.championName] ?? {}

  useEffect(() => {
    getChampionsData()
  }, [])

  async function getChampionsData() {
    console.log(participant.championName)
    const data = await riot.ddragon.getOrFetchChampions()
    setChampionsData(data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 75, height: 75 }}
          source={{
            uri: riot.ddragon.getChampionIcon(champion.id),
          }}
        />

        <View>
          <Text style={styles.title}>{participant.championName}</Text>
          <Text style={styles.text}>{participant.teamPosition}</Text>
          <Text style={styles.text}>{participant.summonerName}</Text>
        </View>

        <View>
          <SimpleKDA
            kills={participant.kills}
            assists={participant.assists}
            deaths={participant.deaths}
          />
        </View>
      </View>
    </View>
  )
}

export default ParticipantFocusDetails
