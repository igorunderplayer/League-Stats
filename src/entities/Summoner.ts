export default class Summoner {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number

  constructor(data: Partial<Summoner> = {}) {
    this.id = data.id ?? ''
    this.accountId = data.accountId ?? ''
    this.puuid = data.puuid ?? ''
    this.name = data.name ?? ''
    this.profileIconId = data.profileIconId ?? 0
    this.revisionDate = data.revisionDate ?? 0
    this.summonerLevel = data.summonerLevel ?? 0
  }
}
