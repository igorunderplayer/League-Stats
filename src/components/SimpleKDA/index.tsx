import { View, Text, StyleSheet } from 'react-native'
import colors from '../../colors'

type Props = {
  kills: number
  deaths: number
  assists: number
  textSize?: number
  bold?: boolean
}

const SimpleKDA: React.FC<Props> = ({
  kills,
  deaths,
  assists,
  textSize = 16,
  bold = true,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: colors.softCyan,
            fontSize: textSize,
            fontWeight: !bold ? 'normal' : 'bold',
          },
        ]}
      >
        {kills}
      </Text>

      <Text style={[styles.text]}> / </Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.softRed,
            fontSize: textSize,
            fontWeight: !bold ? 'normal' : 'bold',
          },
        ]}
      >
        {deaths}
      </Text>

      <Text style={[styles.text]}> / </Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.softOrange,
            fontSize: textSize,
            fontWeight: !bold ? 'normal' : 'bold',
          },
        ]}
      >
        {assists}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

export default SimpleKDA
