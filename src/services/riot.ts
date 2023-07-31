import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { RIOT_API_KEY } from '@env'
import Summoner from '../entities/Summoner'
import ChampionMastery from '../entities/ChampionMastery'
import { LeagueEntry } from '../@types/riot'
import ddragonApi from './ddragon'

interface GetMatchesOptions {
  startTime?: number
  endTime?: number
  queue?: number
  type?: string
  start?: number
  count?: number
}

// TODO: type all
interface RequestOptions {
  url?: string
  region?: 'br1' | 'euw1' | 'kr1' | string
  shard?: 'amercias' | string
}

class Riot {
  api: AxiosInstance
  ddragon = ddragonApi

  //temp
  defaultRegion: RequestOptions['region'] = 'br1'
  defaultShard: RequestOptions['shard'] = 'americas'

  constructor() {
    const riotApi = axios.create({
      baseURL: `https://br1.api.riotgames.com`,
    })
    riotApi.defaults.headers['X-Riot-Token'] = RIOT_API_KEY
    riotApi.defaults.headers['User-Agent'] = 'LeagueStats'

    this.api = riotApi
  }

  async getSummonerByName(name: string, region = this.defaultRegion) {
    const res = await this.request({
      url: `/lol/summoner/v4/summoners/by-name/${name}`,
      region,
    })

    console.log(res.data)

    return new Summoner(res.data)
  }

  async getSummonerLeague(summonerId: string, region = this.defaultRegion) {
    const res = await this.request<LeagueEntry[]>({
      url: `/lol/league/v4/entries/by-summoner/${summonerId}`,
      region,
    })

    return res.data
  }

  async getSummonerChampionsMasteries(
    summonerId: string,
    region = this.defaultRegion,
  ) {
    const res = await this.request({
      url: `/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
      region,
    })

    if (Array.isArray(res.data)) {
      const masteries = res.data.map((m) => new ChampionMastery(m))
      return masteries
    }
  }

  async getFreeChampionsIdRotation(): Promise<number[]> {
    const res = await this.api.get(`/lol/platform/v3/champion-rotations`)
    return res.data.freeChampionIds
  }

  async getMatchesByPuuid(
    puuid: string,
    options: GetMatchesOptions = {},
    shard = this.defaultShard,
  ): Promise<string[]> {
    const params = new URLSearchParams()

    for (const option in options) {
      const value = options[option as keyof GetMatchesOptions]

      if (!value) continue

      params.append(option, value.toString())
    }

    const res = await this.request({
      url: `/lol/match/v5/matches/by-puuid/${puuid}/ids?${params.toString()}`,
      shard,
    })

    return res.data
  }

  async getMatchById(matchId: string, shard = this.defaultShard) {
    const res = await this.request({
      url: `/lol/match/v5/matches/${matchId}`,
      shard,
    })

    return res.data
  }

  async request<T = any>(options: RequestOptions): Promise<AxiosResponse<T>> {
    const _options: RequestOptions = {
      shard: 'americas',
    }

    Object.assign(_options, options)

    const res = await axios.request<T>({
      url:
        `https://${_options.region ?? _options.shard}.api.riotgames.com` +
        _options.url,
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
        'User-Agent': 'LeagueStats',
      },
    })

    return res
  }
}

export default new Riot()
