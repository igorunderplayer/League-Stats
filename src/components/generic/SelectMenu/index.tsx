import React, { useState } from 'react'
import { View } from 'react-native'
import { Menu, Button, Divider } from 'react-native-paper'

interface Item {
  text: string
  key: string
  data: unknown
}

interface Props {
  text: string
  items: Item[]
  onSelect: (item: Item) => unknown
}

const SelectMenu: React.FC<Props> = ({
  text,
  items,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleSelect = (item: Item) => {
    onSelect(item)
    closeMenu()
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          mode="outlined"
          onPress={openMenu}
          icon="menu-down"
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          {text}
        </Button>
      }
    >
      {items.map((item, index) => (
        <React.Fragment key={item.key}>
          <Menu.Item
            onPress={() => handleSelect(item)}
            title={item.text}
          />
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Menu>
  )
}

export { SelectMenu }
