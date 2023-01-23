import { StyleSheet, Text, View } from 'react-native'
import FreeChampionsRotation from '../components/FreeChampionsRotation';
import { useSummoner } from '../hooks/summoner';
import themes from '../themes';

export default function Home() {
  const { summoner } = useSummoner()

  return (
    <View style={styles.container}>

      <FreeChampionsRotation />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})
