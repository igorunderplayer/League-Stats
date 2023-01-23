import axios, { AxiosInstance } from 'axios'
import Account from '../entities/Account'

import { RIOT_API_KEY } from '@env'
import Summoner from '../entities/Summoner'
import ChampionMastery from '../entities/ChampionMastery'

export default class Riot {
  api: AxiosInstance
  
  constructor(region: string) {
    const riotApi = axios.create({
      baseURL: `https://${region.toLowerCase()}.api.riotgames.com`,
   })

    riotApi.defaults.headers['X-Riot-Token'] = RIOT_API_KEY
    riotApi.defaults.headers['User-Agent'] = 'LeagueStats'

    this.api = riotApi  
  }

  async getSummonerByName(name: string) {
    const res = await this.api.get(`/lol/summoner/v4/summoners/by-name/${name}`)
    return new Summoner(res.data)
  }

  async getSummonerChampionsMasteries(summonerId: string) {
    const res = await this.api.get(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`)
    
    if(Array.isArray(res.data)) {
      const masteries = res.data.map(m => new ChampionMastery(m))
      return masteries
    }
  }

  async getFreeChampionsIdRotation(): Promise<number[]> {
    const res = await this.api.get(`/lol/platform/v3/champion-rotations`)
    return res.data.freeChampionIds
  }
}