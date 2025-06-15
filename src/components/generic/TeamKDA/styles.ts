import { StyleSheet } from 'react-native'
import colors from '../../../colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#ffffff80',
  },
})

export { styles }
