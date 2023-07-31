import { AxiosError } from 'axios'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import Summoner from '../entities/Summoner'
import usePersistedState from './usePersistedState'
import riot from '../services/riot'

type SummonerContextData = {
  name?: string
  region?: string
  summoner?: Summoner
  setName: React.Dispatch<React.SetStateAction<string>>
  setRegion: React.Dispatch<React.SetStateAction<string>>
  resetSummoner: () => Promise<void>
}

type SummonerProviderProps = {
  children: ReactNode
}

export const SummonerContext = createContext({} as SummonerContextData)

function SummonerProvider({ children }: SummonerProviderProps) {
  const [summoner, setSummoner] = useState<Summoner>()
  const [name, setName] = usePersistedState<string>('name')
  const [region, setRegion] = usePersistedState<string>('region')

  useEffect(() => {
    console.log('aaaa')
    if (!summoner) {
      getSummoner()
    }
  }, [name, region])

  async function getSummoner() {
    try {
      if (!name?.length || !region?.length) return
      const res = await riot.getSummonerByName(name, region)
      setSummoner(res)

      console.log('Summoner updated successfully', res)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error({ ...e })
      }
    }
  }

  async function resetSummoner() {
    setSummoner(undefined)
    setName('')
    setRegion('')
  }

  return (
    <SummonerContext.Provider
      value={{
        summoner,
        name,
        region,
        setName,
        setRegion,
        resetSummoner,
      }}
    >
      {children}
    </SummonerContext.Provider>
  )
}

function useSummoner() {
  const context = useContext(SummonerContext)

  return context
}

export { SummonerProvider, useSummoner }
