import axios, { AxiosInstance } from 'axios'
import { DDragonChampionsRaw } from '../@types/riot'


interface CacheKey<T> {
  gotAt: number
  data?: T
}

interface DDragonCache {
 [key: string]: CacheKey<unknown>
}

class DDragon {

  readonly #CURRENT_PATCH = '13.14.1'

  api: AxiosInstance

  #baseURL = 'https://ddragon.leagueoflegends.com'


  #cache: DDragonCache = {
    versions: {
      gotAt: 0,
      data: undefined,
    },
    champions: {
      gotAt: 0,
      data: undefined,
    }
  }

  constructor() {
    this.api = axios.create({
      baseURL: this.#baseURL,
    })
  }

  get versions() {
    const versions = this.#cache.versions as CacheKey<string[]>

    if (!versions.data) {
      this.getOrFetchVersions()
      return [this.#CURRENT_PATCH]
    }

    return versions.data
  }

  getIcon(iconId: number) {
    const versions = this.versions

    if (!versions)
      return this.#baseURL + `/cdn/${this.#CURRENT_PATCH}/img/profileicon/${iconId}.png`

    return this.#baseURL + `/cdn/${versions[0]}/img/profileicon/${iconId}.png`
  }

  async getOrFetchVersions() {
    if (!this.#cache.versions.data) {
      const versions = await this.fetchVersions()

      this.#cache.versions = {
        gotAt: Date.now(),
        data: versions,
      }

      return versions
    }

    return this.#cache.versions.data
  }

  async getOrFetchChampions() {
    if (!this.#cache.champions.data) {
      const champions = await this.fetchChampions()

      this.#cache.champions = {
        gotAt: Date.now(),
        data: champions,
      }

      new Map()

      

      return champions
    }

    return this.#cache.champions.data
  }

  async fetchVersions() {
    console.log('Fetching versions data')
    const res = await this.api.get<string[]>('api/versions.json')
    return res.data
  }

  async fetchChampions(locale: string = 'en_US'): Promise<DDragonChampionsRaw> {
    console.log('Fetching champions data')
    const [version] = this.versions
    const res = await this.api.get(`/cdn/${version}/data/${locale}/champion.json`)


    return res.data.data
  }
}

export default new DDragon()
