import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import { List, TouchableRipple, Text } from 'react-native-paper'

import { styles } from './styles'

interface Item {
  text: string
  key: string
  data: unknown
}

interface Props {
  text: string
  open: boolean
  styles?: StyleProp<ViewStyle>
  items: Item[]
  onPress: () => unknown
  onSelect: (item: Item) => unknown
}

const SelectMenu: React.FC<Props> = ({
  text,
  open,
  items,
  onPress,
  onSelect,
  ...props
}) => {
  return (
    <View style={[styles.container, props.styles]}>
      <TouchableRipple
        onPress={onPress}
        style={{ padding: 12 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="titleMedium">{text}</Text>
          <MaterialIcons
            name={open ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            size={32}
            color='#ffffff70'
          />
        </View>
      </TouchableRipple>

      {open ? (
        <View>
          {items.map((item) => (
            <List.Item
              key={item.key}
              title={item.text}
              onPress={() => onSelect(item)}
              style={{ paddingLeft: 24 }}
            />
          ))}
        </View>
      ) : null}
    </View>
  )
}

export { SelectMenu }
