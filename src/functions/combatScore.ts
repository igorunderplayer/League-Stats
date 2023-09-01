export default function getCombatScore(kills: number, assists: number, teamKills: number): number{
  const calc = ((kills + assists) / teamKills) * 100
  const combatScore = isNaN(calc)
    ? 0
    : !isFinite(calc)
    ? 100
    : calc

  return combatScore
}