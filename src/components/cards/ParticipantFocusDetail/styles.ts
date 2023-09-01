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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16
  },
  content: {
    width: '100%',
    padding: 12
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#ffffff80'
  },
  subText: {
    color: '#ffffff60'
  }
})

export default styles