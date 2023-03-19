export interface LeagueEntry {
  leagueId:	string	
  summonerId:	string
  summonerName:	string	
  queueType:	string	
  tier: string	
  rank: string
  leaguePoints: number
  wins: number
  losses: numebr
  hotStreak: boolean	
  veteran: boolean	
  freshBlood: boolean	
  inactive: boolean	
  miniSeries: MiniSeries
}

export interface MiniSeries {
  losses: int	
  progress:string	
  target:int	
  wins:int
}