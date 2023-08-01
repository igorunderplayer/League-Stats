import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View, FlatList } from 'react-native'
import { Match } from '../@types/riot'
import MatchInfoCard from '../components/MatchInfo'
import { useSummoner } from '../hooks/summoner'
import themes from '../themes'
import MatchInfo from './MatchInfo'
import riot from '../services/riot'

type HistoryStackParamList = {
  historyDefault: undefined
  matchInfo: {
    matchId: string
  }
}

const Stack = createNativeStackNavigator<HistoryStackParamList>()

export default function HistoryRouter() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='historyDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='historyDefault'
          component={History}
        />

        <Stack.Screen
          name='matchInfo'
          component={MatchInfo}
        />
      </Stack.Navigator>
    </View>
  )
}

function History() {
  const navigation = useNavigation()
  const { region, summoner } = useSummoner()
  const [matches, setMatches] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const handleOnClickMatch = useCallback((match: Match) => {
    navigation.navigate('matchInfo', {
      matchId: match.metadata.matchId,
    })
  }, [])

  useEffect(() => {
    if (!region || !summoner) return

    try {
      riot
        .getMatchesByPuuid(summoner.puuid, { count: 10 })
        .then(async (data) => {
          const matches = await Promise.all(
            data.map(async (matchId) => {
              const match = await riot.getMatchById(matchId)
              return match
            }),
          )

          setMatches(matches)
        })
    } finally {
      setLoading(false)
    }
  }, [])

  async function loadMoreMatches() {
    if (!region || !summoner || loading) return

    setLoading(true)

    try {
      const more = await riot
        .getMatchesByPuuid(summoner.puuid, {
          count: 10,
          start: matches.length,
        })
        .then(async (data) => {
          return await Promise.all(
            data.map(async (matchId) => {
              const match = await riot.getMatchById(matchId)
              return match
            }),
          )
        })

      setMatches((val) => [...val, ...more])
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.matchList}
        contentContainerStyle={styles.matchListContainer}
        keyExtractor={(item) => item.metadata.matchId}
        data={matches}
        renderItem={({ item }) => (
          <MatchInfoCard
            match={item}
            onClick={handleOnClickMatch}
          />
        )}
        onEndReached={loadMoreMatches}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchList: {
    width: '100%',
  },
  matchListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
