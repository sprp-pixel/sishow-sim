export function useSimulator() {
  function simulateSong(song: any, card: any) {
    const logs = []
    let voltagePoints = 0
    let voltageBoost = 0
    let scoreBoost = 0
    let totalScore = 0

    const voltageLevel = (vp: number) => {
      let level = 0
      while (vp >= 5 * level * (level + 1)) level++
      return level - 1
    }

    const appeal =
      (song.attribute === 'スマイル' ? card.smile : card.smile / 10) +
      (song.attribute === 'ピュア' ? card.pure : card.pure / 10) +
      (song.attribute === 'クール' ? card.cool : card.cool / 10)

    for (let i = 1; i <= song.skillActivations; i++) {
      const isFever = song.feverSections.includes(i)
      const currentVLevel = voltageLevel(voltagePoints) * (isFever ? 2 : 1)

      const log: any = {
        turn: i,
        isFever,
        effects: [],
        beforeVP: voltagePoints,
        beforeScore: totalScore
      }

      for (const effect of card.skill.effects) {
        if (effect.type === 'ボルテージゲイン') {
          const gain = effect.value * (1 + voltageBoost / 100)
          voltagePoints += gain
          log.effects.push(`ボルテージ+${gain}`)
          voltageBoost = 0
        } else if (effect.type === 'ボルテージブースト') {
          voltageBoost += effect.value
          log.effects.push(`ボルテージブースト+${effect.value}%`)
        } else if (effect.type === 'スコアアップ') {
          const score = appeal * (effect.value / 100) *
            (1 + scoreBoost / 100) *
            (1 + currentVLevel / 10) *
            (1 + song.masteryLevel / 10)
          totalScore += score
          log.effects.push(`スコア+${Math.round(score)}`)
          scoreBoost = 0
        } else if (effect.type === 'スコアブースト') {
          scoreBoost += effect.value
          log.effects.push(`スコアブースト+${effect.value}%`)
        }
      }

      log.voltagePoints = voltagePoints
      log.totalScore = Math.round(totalScore)
      logs.push(log)
    }

    return logs
  }

  return { simulateSong }
}
