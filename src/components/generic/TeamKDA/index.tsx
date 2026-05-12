import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { MatchParticipant } from '../../../@types/riot'
import colors from '../../../colors'
import { useTranslation } from 'react-i18next'

interface Props {
  participants: MatchParticipant[]
  won: boolean
}

const TeamKDA: React.FC<Props> = ({ participants, won }) => {
  const { t } = useTranslation()
  const kda = useMemo(() => {
    return participants.reduce(
      (acc, p) => ({
        kills: acc.kills + p.kills,
        deaths: acc.deaths + p.deaths,
        assists: acc.assists + p.assists,
      }),
      { kills: 0, deaths: 0, assists: 0 },
    )
  }, [participants])

  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { color: won ? colors.softCyan : colors.softRed }]}
      >
        {won ? t('common.victory') : t('common.defeat')}
      </Text>

      <Text style={styles.subText}>
        {kda?.kills} / {kda?.deaths} / {kda?.assists}
      </Text>
    </View>
  )
}

export { TeamKDA }
