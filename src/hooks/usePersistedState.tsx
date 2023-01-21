import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function usePersistedState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue)

  function setItemInStorage(key: string, value: T) {
    if (typeof value == 'string') {
      return AsyncStorage.setItem(key, value)
    } else {
      return AsyncStorage.setItem(key, JSON.stringify(value))
    }
  }

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(storedValue => {
        if (storedValue == null) return setItemInStorage(key, defaultValue)

        try {
          const storedValueObject = JSON.parse(storedValue) as T
          setValue(storedValueObject)
        } catch {
          setValue(storedValue as T)
        }
      })
  }, [])

  useEffect(() => {
    if (typeof value == 'string') {
      AsyncStorage.setItem(key, value)
    } else {
      AsyncStorage.setItem(key, JSON.stringify(value))
    }
  }, [value])

  return [value, setValue]
}