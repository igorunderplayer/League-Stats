export default class ChampionMastery {
  championPointsUntilNextLevel: number
  chestGranted: boolean
  championId: number
  lastPlayTime: number
  championLevel: number
  summonerId: string
  championPoints: number
  championPointsSinceLastLevel: number
  tokensEarned: number

  constructor(data: any = {}) {
    this.championPointsUntilNextLevel = data.championPointsUntilNextLevel
    this.chestGranted = data.chestGranted
    this.championId = data.championId
    this.lastPlayTime = data.lastPlayTime
    this.championLevel = data.championLevel
    this.summonerId = data.summonerId
    this.championPoints = data.championPoints
    this.championPointsSinceLastLevel = data.championPointsSinceLastLevel
    this.tokensEarned = data.tokensEarned
  }
}
