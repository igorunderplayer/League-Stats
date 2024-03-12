import { useCallback, useState } from 'react'
import { Match, RiotRegion } from '../@types/riot'
import Summoner from '../entities/Summoner'
import riot from '../services/riot'

export const MATCH_LOAD_COUNT = 10

export default function useSummonerMatches(
  summoner?: Summoner,
  region?: RiotRegion,
) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)

  const loadMatches = useCallback(async () => {
    if (loading) return

    setLoading(true)

    try {
      if (!summoner) return

      const ids = await riot.getMatchesByPuuid(
        summoner.puuid,
        {
          count: MATCH_LOAD_COUNT,
          start: matches.length,
        },
        region,
      )

      const data = await Promise.all(ids.map((id) => riot.getMatchById(id)))
      setMatches(data)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loadMatches,
    matches,
    loading,
  }
}
