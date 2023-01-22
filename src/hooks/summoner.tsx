import { AxiosError } from 'axios'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import Summoner from '../entities/Summoner'
import Riot from '../services/riot'
import usePersistedState from './usePersistedState'


type SummonerContextData = {
  name?: string
  region?: string
  summoner?: Summoner
  setName: React.Dispatch<React.SetStateAction<string>>
  setRegion: React.Dispatch<React.SetStateAction<string>>
}

type AuthProviderProps = {
  children: ReactNode;
}

export const SummonerContext = createContext({} as SummonerContextData);

function SummonerProvider({ children }: AuthProviderProps) {
  const [summoner, setSummoner] = useState<Summoner | null>(null)
  const [name, setName] = usePersistedState<string | null>('name', null)
  const [region, setRegion] = usePersistedState<string | null>('region', null)


  useEffect(() => {
    if (!summoner) {
      getSummoner()
    }
  }, [name, region])

  async function getSummoner() {
    try {
      if (!name || !region) return
      const res = await new Riot(region).getSummonerByName(name)
      setSummoner(res)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error({ ...e })
      }
    }

  }

  return (
    <SummonerContext.Provider value={{
      summoner,
      name,
      region,
      setName,
      setRegion
    }}>
      {children}
    </SummonerContext.Provider>
  )
}

function useSummoner() {
  const context = useContext(SummonerContext);

  return context;
}

export {
  SummonerProvider,
  useSummoner
}