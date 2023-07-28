import axios, { AxiosInstance } from 'axios';

interface DDragonCache {
  versions: {
    gotAt: number
    data?: string[]
  }
}

class DDragon {
  api: AxiosInstance

  #baseURL = 'https://ddragon.leagueoflegends.com'

  #cache: DDragonCache = {
    versions: {
      gotAt: 0,
      data: undefined 
    }
  }

  constructor() {
    this.api = axios.create({
      baseURL: this.#baseURL,
   })
  }

  get versions() {
    const versions = this.#cache.versions.data
    
    if (!versions) {
      this.fetchVersions()
      return null
    }

    return versions
  }

  getIcon(iconId: number) {
    const versions = this.versions

    if (!versions) 
      return this.#baseURL + `/cdn/13.14.1/img/profileicon/${iconId}.png`

    return this.#baseURL + `/cdn/${versions[0]}/img/profileicon/${iconId}.png`
  }

  async getOrFetchVersions() {
    if (!this.#cache.versions.data) {
      const versions = await this.fetchVersions()

      this.#cache.versions = {
        gotAt: Date.now(),
        data: versions
      }

      return versions
    }

    return this.#cache.versions.data
  }

  async fetchVersions() {
    const res = await this.api.get<string[]>('api/versions.json')
    return res.data
  }
}

export default new DDragon()