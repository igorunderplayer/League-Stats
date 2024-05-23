import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { styles } from './styles'

interface Item {
  text: string
  key: string
  data: unknown
}

interface Props {
  text: string
  styles?: StyleProp<ViewStyle>
  items: Item[]
  onSelect: (item: Item) => unknown
}

const SelectMenu: React.FC<Props> = ({ text, items, onSelect, ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <TouchableOpacity
      style={[styles.container, props.styles]}
      onPress={() => setOpen((val) => !val)}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>{text}</Text>
        <MaterialIcons
          name={open ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          size={32}
          color='#ffffff70'
        />
      </View>

      {open ? (
        <View>
          {items.map((item) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              key={item.key}
            >
              <Text style={styles.subText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

export { SelectMenu }
