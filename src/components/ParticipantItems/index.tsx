import { View, StyleSheet, Image } from 'react-native'
import colors from '../../colors'

type Props = {
  items: number[]
}

const ParticipantItems: React.FC<Props> = ({ items }) => {
  return (
    <View style={styles.container}>
      { items.map(item => (
        <Image
          style={styles.image}
          source={{
            uri: `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${item}.png`
          }}
        />
      )) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 112,
    gap: 2,
    margin: 2 
  },
  text: {
    color: colors.white,
    fontWeight: 'bold'
  },
  image: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff05',
    borderRadius: 4
  }
})

export default ParticipantItems