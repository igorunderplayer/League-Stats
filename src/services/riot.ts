import axios, { AxiosResponse } from 'axios'

import { RIOT_API_KEY } from '@env'
import { LeagueEntry, Match } from '../@types/riot'
import ChampionMastery from '../entities/ChampionMastery'
import Summoner from '../entities/Summoner'
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
  shard?: 'americas' | string
}

class Riot {
  ddragon = ddragonApi

  //temp
  defaultRegion: RequestOptions['region'] = 'br1'
  defaultShard: RequestOptions['shard'] = 'americas'

  async getSummonerByName(name: string, region = this.defaultRegion) {
    const res = await this.request<Summoner>({
      url: `/lol/summoner/v4/summoners/by-name/${name}`,
      region,
    })

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

  async getFreeChampionsIdRotation(region = this.defaultRegion): Promise<number[]> {
    const res = await this.request<{ freeChampionIds: number[] }>({ url: `/lol/platform/v3/champion-rotations`, region })
    console.log(res.data)
    return res.data.freeChampionIds
  }

  async getMatchesByPuuid(
    puuid: string,
    options: GetMatchesOptions = {},
    shard = this.defaultShard,
  ): Promise<string[]> {
    console.log('Fetching matches for puuid: ', puuid)
    const params = new URLSearchParams()

    for (const option in options) {
      const value = options[option as keyof GetMatchesOptions]

      if (!value) continue

      params.append(option, value.toString())
    }

    const res = await this.request<string[]>({
      url: `/lol/match/v5/matches/by-puuid/${puuid}/ids?${params.toString()}`,
      shard,
    })

    return res.data
  }

  async getMatchById(matchId: string, shard = this.defaultShard) {
    const res = await this.request<Match>({
      url: `/lol/match/v5/matches/${matchId}`,
      shard,
    })

    return res.data
  }

  async request<T = unknown>(options: RequestOptions): Promise<AxiosResponse<T>> {
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
