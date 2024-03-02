import { AxiosError } from 'axios'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import Summoner from '../entities/Summoner'
import riot from '../services/riot'
import usePersistedState from './usePersistedState'

export type SummonerInfo = {
  name: string
  region: string
}

type SummonerContextData = {
  name?: string
  region?: string
  summoner?: Summoner
  setName: React.Dispatch<React.SetStateAction<string>>
  setRegion: React.Dispatch<React.SetStateAction<string>>
  resetSummoner: () => Promise<void>
  getSummoner: (name: string, region: string) => Promise<void>
  addSummoner: (name: string, region: string) => void
  savedSummoners: SummonerInfo[]
}

type SummonerProviderProps = {
  children: ReactNode
}

export const SummonerContext = createContext({} as SummonerContextData)

function SummonerProvider({ children }: SummonerProviderProps) {
  const [summoner, setSummoner] = useState<Summoner>()
  const [name, setName] = usePersistedState<string>('name')
  const [region, setRegion] = usePersistedState<string>('region')

  const [savedSummoners, setSavedSummoners] = usePersistedState<SummonerInfo[]>(
    'summoners',
    [],
  )

  async function getSummoner(name: string, region: string) {
    try {
      if (!name?.length || !region?.length) return
      const res = await riot.getSummonerByName(name, region)
      setName(name)
      setRegion(region)
      setSummoner(res)

      console.log('Summoner updated successfully')
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error({ ...e })
      }
    }
  }

  function addSummoner(name: string, region: string) {
    if (savedSummoners.find((s) => s.name == name && s.region == region)) return

    setSavedSummoners((val) => [...val, { name, region }])
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
        getSummoner,
        addSummoner,
        savedSummoners,
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
