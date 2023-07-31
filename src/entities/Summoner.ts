export default class Summoner {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number

  constructor(data: any = {}) {
    this.id = data.id
    this.accountId = data.accountId
    this.puuid = data.puuid
    this.name = data.name
    this.profileIconId = data.profileIconId
    this.revisionDate = data.revisionDate
    this.summonerLevel = data.summonerLevel
  }
}
