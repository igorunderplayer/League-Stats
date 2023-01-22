import { StyleSheet, View } from 'react-native'
import { useSummoner } from '../hooks/summoner'
import themes from '../themes'

export default function History() {
  const { region, summoner } = useSummoner()

  return (
    <View style={styles.container}>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
  }
});
