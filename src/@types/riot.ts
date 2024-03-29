import type { GameModeNames } from '../constants'

// DDragon
export interface DDragonChampionsRaw {
  [key: string]: ChampionData
}

export interface ChampionData {
  id: string
  key: string
  name: string
  title: string
  image: {
    full: string
    sprite: string
  }
}


// League of Legends

export type TeamPosition = 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY'

export interface LeagueEntry {
  leagueId: string
  summonerId: string
  summonerName: string
  queueType: string
  tier: string
  rank: string
  leaguePoints: number
  wins: number
  losses: number
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
  miniSeries: MiniSeries
}

export interface MiniSeries {
  losses: number
  progress: string
  target: number
  wins: number
}

export interface Match {
  metadata: {
    matchId: string
  }
  info: {
    platformId: string
    gameMode: keyof typeof GameModeNames
    participants: MatchParticipant[]
    gameDuration: number
    teams: MatchTeam[]
  }
}

export interface MatchTeam {
  teamId: number
  win: boolean
}

export interface MatchParticipant {
  // basic
  puuid: string
  summonerName: string
  championName: string
  champLevel: number
  role: string
  teamId: number
  teamPosition: TeamPosition 

  // kda
  assists: number
  deaths: number
  kills: number

  // items
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  itemsPurchased: number

  summoner1Id: number // spell 1
  summoner2Id: number // spell 2

  win: boolean

  perks: ParticipantPerks

  totalMinionsKilled: number
  neutralMinionsKilled: number
  visionScore: number

  goldEarned: number
  goldSpent: number


  // Damage statistics
  totalDamageDealt: number
  totalDamageDealtToChampions: number

  physicalDamageDealt: number	
  physicalDamageDealtToChampions: number

  magicDamageDealt: number
  magicDamageDealtToChampions: number

  trueDamageDealt: number
  trueDamageDealtToChampions: number
}

export interface ParticipantPerks {
  statPerks: PerksStats
  styles: PerkStyle[]
}

export interface PerksStats {
  defense: number
  flex: number
  offense: number
}

export interface PerkStyle {
  description: string
  selections: PerkStyleSelection[]
  style: number
}

export interface PerkStyleSelection {
  perk: number
  var1: number
  var2: number
  var3: number
}
