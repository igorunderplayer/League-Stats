import { LeagueStats } from '../services/league-stats'
import { usePreferences } from './usePreferences'

declare const process: {
  env: {
    [key: string]: string
  }
}

const LEAGUE_STATS_API_URL = process.env.EXPO_PUBLIC_LEAGUE_STATS_API_URL

let instance: LeagueStats | null = null
let lastUrl: string | null = null

export function getLeagueStats(apiUrl: string): LeagueStats {
  if (!instance || lastUrl !== apiUrl) {
    instance = new LeagueStats(apiUrl)
    lastUrl = apiUrl
  }
  return instance
}

const useLeagueStats = () => {
  const { apiUrl } = usePreferences()
  const url = apiUrl ?? LEAGUE_STATS_API_URL
  if (!url) {
    throw new Error(
      'API URL is not defined. Please set EXPO_PUBLIC_LEAGUE_STATS_API_URL in your environment variables or provide it in preferences.',
    )
  }
  const leaguestats = getLeagueStats(url)
  return { leaguestats }
}

export { useLeagueStats }
