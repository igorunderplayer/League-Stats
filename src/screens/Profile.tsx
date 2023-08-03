import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import colors from '../colors'
import LeaguesInfoCard from '../components/cards/LeagueInfosCard'
import MasteriesCard from '../components/cards/MasteriesCard'
import ProfileCard from '../components/cards/ProfileCard'
import themes from '../themes'
import BestChampions from './BestChampions'

const Stack = createNativeStackNavigator()

export default function ProfileRoutes() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='profileDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='profileDefault'
          component={Profile}
        />

        <Stack.Screen
          name='bestChampions'
          component={BestChampions}
        />
      </Stack.Navigator>
    </View>
  )
}

function Profile() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <ProfileCard />
      <LeaguesInfoCard />
      <MasteriesCard />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    paddingVertical: 12,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '95%',
    flexDirection: 'row',
    gap: 12,
  },
  text: {
    color: colors.white,
  },
  inputsContainer: {
    backgroundColor: '#444',
    height: 48,
    width: 256,
    flexDirection: 'row',
  },
})
