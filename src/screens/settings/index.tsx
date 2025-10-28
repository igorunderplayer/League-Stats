import React, { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput, Button, Text } from 'react-native-paper'
import { styles } from './styles'
import { SelectMenu } from '../../components/generic/SelectMenu'
import colors from '../../colors'
import { useState } from 'react'
import { usePreferences } from '../../hooks/usePreferences'

import { resources } from '../../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { languageNames } from '../../resources/strings'
import themes from '../../themes'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  const { primaryColor, setPrimaryColor, setApiUrl, setLanguage } =
    usePreferences()
  const { t } = useTranslation()

  const [colorsOpen, setColorsOpen] = useState(false)
  const [languagesOpen, setLanguagesOpen] = useState(false)

  const [customApiUrl, setCustomApiUrl] = useState('')

  const items = [
    { name: 'Blue', value: colors.softBlue },
    { name: 'Red', value: colors.softRed },
    { name: 'Green', value: colors.softGreen },
    { name: 'Yellow', value: colors.softYellow },
    { name: 'Purple', value: colors.softPurple },
    { name: 'Pink', value: colors.softPink },
    { name: 'Orange', value: colors.softOrange },
    { name: 'Cyan', value: colors.softCyan },
  ]

  const languages = Object.keys(resources).map((langValue) => {
    return {
      name:
        languageNames[langValue as keyof typeof resources] ??
        langValue.toUpperCase(),
      value: langValue,
    }
  })

  const onSelectColor = (value: string) => {
    setPrimaryColor(value)
  }

  const onSelectLanguage = (value: string) => {
    setLanguage(value)
  }

  const changeApiUrl = () => {
    setApiUrl(customApiUrl)
  }

  const resetApiUrl = () => {
    setApiUrl(undefined)
  }

  const handleOnPressDelete = async () => {
    await AsyncStorage.clear()
    alert('All data cleared! Please restart the app.')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text variant="titleMedium" style={styles.title}>
          ⚠️ {t('screen.settings.customApiUrl')}:{' '}
        </Text>
        <TextInput
          placeholder={t('screen.settings.customApiUrlPlaceholder')}
          style={{ marginBottom: 8, backgroundColor: themes.dark.surface }}
          onChangeText={(text) => setCustomApiUrl(text)}
          mode="outlined"
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <Button
            mode="contained"
            onPress={resetApiUrl}
            buttonColor={colors.softRed}
            style={{ width: '25%' }}
          >
            Reset
          </Button>

          <Button
            mode="contained"
            onPress={changeApiUrl}
            style={{ flexGrow: 1 }}
          >
            {t('common.confirm')}
          </Button>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <SelectMenu
          open={colorsOpen}
          onPress={() => setColorsOpen((val) => !val)}
          onSelect={(item) => onSelectColor(item.data as string)}
          items={items.map((c) => ({
            key: c.value,
            data: c.value,
            text: c.name,
          }))}
          text={t('screen.settings.appColor')}
        />

        <SelectMenu
          open={languagesOpen}
          onPress={() => setLanguagesOpen((val) => !val)}
          onSelect={(item) => onSelectLanguage(item.data as string)}
          items={languages.map((lang) => ({
            key: lang.value,
            data: lang.value,
            text: lang.name,
          }))}
          text={t('screen.settings.language')}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleOnPressDelete}
        buttonColor={colors.softRed}
        icon="trash-can-outline"
      >
        {t('screen.settings.deleteData')}
      </Button>
    </View>
  )
}
