import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { Match } from '../@types/riot'
import colors from '../colors'
import MatchInfoCard from '../components/items/MatchInfo'
import { useSummoner } from '../hooks/summoner'
import riot from '../services/riot'
import themes from '../themes'
import MatchInfo from './MatchInfo'

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
  const [matches, setMatches] = useState<Match[]>([])

  const [loading, setLoading] = useState(true)

  const handleOnClickMatch = useCallback((match: Match) => {
    navigation.navigate('matchInfo', {
      matchId: match.metadata.matchId,
    })
  }, [])

  useEffect(() => {
    loadMathes()
  }, [])

  async function loadMathes() {
    if (!region || !summoner) return
    setLoading(true)

    try {
      const matches = await riot
        .getMatchesByPuuid(summoner.puuid, { count: 10 })
        .then((data) => {
          return Promise.all(
            data.map(async (matchId) => {
              const match = await riot.getMatchById(matchId)
              return match
            }),
          )
        })

      setMatches(matches)
    } finally {
      setLoading(false)
    }
  }

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

      {loading ? <ActivityIndicator color={colors.softViolet} /> : null}
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
