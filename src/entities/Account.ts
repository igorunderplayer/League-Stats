export default class Account {
  public puuid: string
  public gameName: string
  public tagLine: string

  constructor(puuid: string, gameName: string, tagLine: string) {
    this.puuid = puuid
    this.gameName = gameName
    this.tagLine = tagLine
  }
}