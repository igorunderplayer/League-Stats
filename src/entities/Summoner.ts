export default class Summoner {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number

  constructor(id: string, accountId: string, puuid: string, name: string, profileIconId: number, revisionDate: number, summonerLevel: number) {
    this.id = id
    this.accountId = accountId
    this.puuid = puuid
    this.name = name
    this.profileIconId = profileIconId
    this.revisionDate = revisionDate
    this.summonerLevel = summonerLevel
  }
}