export default class Account {
  public puuid: string
  public gameName: string
  public tagLine: string

  constructor(data: any = {}) {
    this.puuid = data.puuid
    this.gameName = data.gameName
    this.tagLine = data.tagLine
  }
}
