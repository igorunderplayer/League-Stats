import type { GameModeNames } from '../constants'

// Riot

export interface Account {
  puuid: string,
  gameName: string,
  tagLine: string
}

export const RiotRegions = {
  Americas: 'americas',
  Asia: 'asia',
  Europe: 'europe',
  PBE: 'pbe',
  Unknown: 'unknown',
  isValidString(string: string) {
    return !!this[string as keyof RiotRegion]
  }
} as const

export type RiotRegion = (typeof RiotRegions)[keyof typeof RiotRegions]

export function regionFromString(string: string): RiotRegion {
  return RiotRegions[string as keyof RiotRegion]
}

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

export const LeagueRegions = {
  // America
  BR1: 'br1',
  NA1: 'na1',
  LA1: 'la1',
  LA2: 'la2',
  // Europe
  EUN1: 'eun1',
  EUW1: 'euw1',
  TR1: 'tr1',
  RU: 'ru',
  // Asia
  JP1: 'jp1',
  KR: 'kr',
  SG2: 'sg2',
  PH2: 'ph2',
  TW2: 'tw2',
  TH2: 'th2',
  VN2: 'vn2',
  ID1: 'id1',

  // Other
  PBE1: 'pbe1',
  UNKNOWN: 'unknown'
} as const


export type LeagueRegion = (typeof LeagueRegions)[keyof typeof LeagueRegions]

export function leagueFromString(string: string): LeagueRegion {
  return LeagueRegions[string as keyof LeagueRegion]
}

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
