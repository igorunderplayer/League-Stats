import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native'
import colors from '../colors'
import MasteriesCard from '../components/MasteriesCard'
import ProfileCard from '../components/ProfileCard'
import LeaguesInfoCard from '../components/LeagueInfosCard'
import { useSummoner } from '../hooks/summoner'
import Riot from '../services/riot'
import themes from '../themes'
import BestChampions from './BestChampions'

const Stack = createNativeStackNavigator()

export default function ProfileRoutes() {
  const { region, summoner } = useSummoner()

  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator initialRouteName='profileDefault' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="profileDefault" component={Profile} />

        <Stack.Screen name="bestChampions" component={BestChampions} />
      </Stack.Navigator>
    </View>
  );
}

function Profile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }}>
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
    paddingVertical: 12 
  },
  text: {
    color: colors.white
  },
  inputsContainer: {
    backgroundColor: '#444',
    height: 48,
    width: 256,
    flexDirection: 'row'
  }
});
