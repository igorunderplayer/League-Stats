import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text } from 'react-native'
import { LeagueEntry } from '../../../@types/riot'
import colors from '../../../colors'
import { useSummoner } from '../../../hooks/useSummoner'
import riot from '../../../services/riot'
import LeagueInfo from '../../items/LeagueInfo'
import Card from '../../ui/card'

const LeagueInfosCard: React.FC = () => {
  const { leagueRegion, summoner } = useSummoner()
  const { t } = useTranslation()

  const [leagues, setLeagues] = useState<LeagueEntry[]>([])

  useEffect(() => {
    if (!leagueRegion || !summoner) return
    riot.getSummonerLeague(summoner?.id, leagueRegion).then((leagues) => {
      setLeagues(leagues.filter((l) => l.queueType != 'CHERRY'))
    })
  }, [])

  if (!leagues?.length) return <></>

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{t('card.leagueInfo.title')}</Text>

      {leagues.map((league) => (
        <LeagueInfo
          key={league.queueType}
          league={league}
        />
      ))}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 8,
  },
})

export default LeagueInfosCard
