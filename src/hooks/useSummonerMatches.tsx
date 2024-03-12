import { useState } from 'react'
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

  const loadMatches = async () => {
    if (loading) return

    setLoading(true)

    try {
      if (!summoner) throw Error('Summoner is not available or null')

      const ids = await riot.getMatchesByPuuid(
        summoner.puuid,
        {
          count: MATCH_LOAD_COUNT,
          start: matches.length,
        },
        region,
      )

      for await (const matchId of ids) {
        const match = await riot.getMatchById(matchId, region)
        setMatches((prev) => [...prev, match])
      }

      // const data = await Promise.all(ids.map((id) => riot.getMatchById(id)))
      // setMatches((prev) => [...prev, ...data])
    } finally {
      setLoading(false)
    }
  }

  return {
    loadMatches,
    matches,
    loading,
  }
}
