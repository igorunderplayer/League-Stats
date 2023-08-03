import { StyleSheet } from 'react-native'
import colors from '../../../colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff05',
    padding: 12,
    borderRadius: 12,
    width: '100%'
  },
  header: {
    flexDirection: 'row'
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: colors.white
  }
})

export default styles