import { AxiosError } from 'axios'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import Summoner from '../entities/Summoner'
import riot from '../services/riot'
import usePersistedState from './usePersistedState'

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
    if (!summoner) {
      getSummoner()
    }
  }, [name, region])

  async function getSummoner() {
    try {
      if (!name?.length || !region?.length) return
      const res = await riot.getSummonerByName(name, region)
      setSummoner(res)

      console.log('Summoner updated successfully')
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
        name,
        region,
        summoner,
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
