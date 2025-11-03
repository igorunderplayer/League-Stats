import React, { View } from 'react-native'
import { TextInput, Button, Text, Surface, Divider, List } from 'react-native-paper'
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
    <Surface
      style={{
        flex: 1,
        backgroundColor: themes.dark.background,
      }}
    >
      <View style={{ padding: 16, gap: 16 }}>
        {/* API Configuration Section */}
        <Surface elevation={1} style={{ borderRadius: 16, padding: 16, gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text variant="titleLarge">⚠️</Text>
            <Text variant="titleMedium">{t('screen.settings.customApiUrl')}</Text>
          </View>
          
          <TextInput
            placeholder={t('screen.settings.customApiUrlPlaceholder')}
            onChangeText={(text) => setCustomApiUrl(text)}
            mode="outlined"
            dense
          />

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              mode="outlined"
              onPress={resetApiUrl}
              style={{ flex: 1 }}
            >
              Reset
            </Button>

            <Button
              mode="contained"
              onPress={changeApiUrl}
              style={{ flex: 2 }}
            >
              {t('common.confirm')}
            </Button>
          </View>
        </Surface>

        {/* Appearance Section */}
        <Surface elevation={1} style={{ borderRadius: 16, padding: 16, gap: 12 }}>
          <Text variant="titleMedium">{t('screen.settings.appColor')}</Text>
          <SelectMenu
            onSelect={(item) => onSelectColor(item.data as string)}
            items={items.map((c) => ({
              key: c.value,
              data: c.value,
              text: c.name,
            }))}
            text={t('screen.settings.appColor')}
          />

          <Divider style={{ marginVertical: 8 }} />

          <Text variant="titleMedium">{t('screen.settings.language')}</Text>
          <SelectMenu
            onSelect={(item) => onSelectLanguage(item.data as string)}
            items={languages.map((lang) => ({
              key: lang.value,
              data: lang.value,
              text: lang.name,
            }))}
            text={t('screen.settings.language')}
          />
        </Surface>

        {/* Danger Zone */}
        <Surface 
          elevation={1} 
          style={{ 
            borderRadius: 16, 
            padding: 16, 
            gap: 12,
          }}
        >
          <Text variant="titleMedium" style={{ color: colors.softRed }}>
            Danger Zone
          </Text>
          
          <Button
            mode="contained"
            onPress={handleOnPressDelete}
            buttonColor={colors.softRed}
            icon="delete-forever"
          >
            {t('screen.settings.deleteData')}
          </Button>
        </Surface>
      </View>
    </Surface>
  )
}
