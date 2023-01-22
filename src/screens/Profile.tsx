import { useEffect } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import colors from '../colors'
import MasteriesCard from '../components/MasteriesCard'
import ProfileCard from '../components/ProfileCard'
import { useSummoner } from '../hooks/summoner'
import Riot from '../services/riot'
import themes from '../themes'

export default function Profile() {
  const { region, summoner } = useSummoner()

  return (
    <View style={styles.container}>

      <ProfileCard />

      <MasteriesCard />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
