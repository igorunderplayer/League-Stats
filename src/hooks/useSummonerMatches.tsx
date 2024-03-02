import { useCallback, useState } from 'react'
import { Match } from '../@types/riot'
import Summoner from '../entities/Summoner'
import riot from '../services/riot'

export const MATCH_LOAD_COUNT = 10

export default function useSummonerMatches(summoner?: Summoner) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  const loadMatches = useCallback(async () => {
    setLoading(true)

    try {
      if (!summoner) return

      const ids = await riot.getMatchesByPuuid(summoner.puuid, {
        count: MATCH_LOAD_COUNT,
        start: matches.length,
      })

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
