import { LeagueRegion, RiotRegion, RiotRegions } from '../@types/riot'


export default function riotRegionFromLeague(region: LeagueRegion): RiotRegion {

  const _region = (region as string).toLowerCase()
  const mapping = { 
    'br1': RiotRegions.Americas,
    'na1': RiotRegions.Americas,
    'la1': RiotRegions.Americas,
    'la2': RiotRegions.Americas,
    'eun1': RiotRegions.Europe,
    'euw1': RiotRegions.Europe,
    'tr1': RiotRegions.Europe,
    'ru': RiotRegions.Europe,
    'jp1': RiotRegions.Asia,
    'kr': RiotRegions.Asia,
    'sg2': RiotRegions.Sea,
    'ph2': RiotRegions.Sea,
    'tw2': RiotRegions.Sea,
    'th2': RiotRegions.Sea,
    'vn2': RiotRegions.Sea,
    'id1': RiotRegions.Sea,
    'pbe1': RiotRegions.PBE,
    'unknown': RiotRegions.Unknown,

  }

  return mapping[_region as LeagueRegion]
}