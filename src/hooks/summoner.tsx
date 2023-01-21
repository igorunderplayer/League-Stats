import React, { createContext, useContext, useState, ReactNode } from 'react'
import Summoner from '../entities/Summoner'
import usePersistedState from './usePersistedState'


type SummonerContextData = {
  name: string
  region: string
  summoner: Summoner,
  setName: React.Dispatch<React.SetStateAction<string>>
  setRegion: React.Dispatch<React.SetStateAction<string>>
}

type AuthProviderProps = {
  children: ReactNode;
}

export const SummonerContext = createContext({} as SummonerContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [summoner, setSummoner] = useState<Summoner>({} as Summoner)
  const [name, setName] = usePersistedState<string>('name', '')
  const [region, setRegion] = usePersistedState<string>('region', '')

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
  AuthProvider,
  useSummoner
}