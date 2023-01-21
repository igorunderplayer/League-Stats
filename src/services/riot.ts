import axios, { AxiosInstance } from 'axios'
import Account from '../entities/Account'

import { RIOT_API_KEY } from '@env'
import Summoner from '../entities/Summoner'

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
    return new Summoner(
      res.data.id,
      res.data.accountId,
      res.data.puuid,
      res.data.name,
      res.data.profileIconId,
      res.data.revisionDate,
      res.data.summonerLevel
    )
  }
}