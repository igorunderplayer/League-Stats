import { StyleSheet } from 'react-native'
import colors from '../../../colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    borderRadius: 12,
  },
  name: {
    padding: 4,
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    color: '#fff',
    fontSize: 18
  }
})