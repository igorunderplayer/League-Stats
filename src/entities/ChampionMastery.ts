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

  constructor(data: Partial<ChampionMastery> = {}) {
    this.championPointsUntilNextLevel = data.championPointsUntilNextLevel ?? 0
    this.chestGranted = data.chestGranted ?? false
    this.championId = data.championId ?? 0
    this.lastPlayTime = data.lastPlayTime ?? 0
    this.championLevel = data.championLevel ?? 0
    this.summonerId = data.summonerId ?? ''
    this.championPoints = data.championPoints ?? 0
    this.championPointsSinceLastLevel = data.championPointsSinceLastLevel ?? 0
    this.tokensEarned = data.tokensEarned ?? 0
  }
}
