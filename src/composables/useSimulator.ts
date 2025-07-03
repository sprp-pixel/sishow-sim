export function useSimulator() {
  function simulateDeck(song: any, deck: any[]) {
    const logs = [];
    let voltagePoints = 0;
    let voltageBoost = 0;
    let scoreBoost = 0;
    let totalScore = 0;

    const excludeMap = new Map<number, number>(); // key: cardIndex, value: remaining uses before exclusion
    let currentIndex = 0;

    const voltageLevel = (vp: number) => {
      let level = 0;
      while (vp >= 5 * level * (level + 1)) level++;
      return level - 1;
    };

    const getAppeal = (card: any) =>
      (song.attribute === "スマイル" ? card.smile : card.smile / 10) +
      (song.attribute === "ピュア" ? card.pure : card.pure / 10) +
      (song.attribute === "クール" ? card.cool : card.cool / 10);

    const getNextCardIndex = (start: number): number => {
      const len = deck.length;
      for (let i = 0; i < len; i++) {
        const idx = (start + i) % len;
        if (!excludeMap.has(idx) || excludeMap.get(idx)! > 0) return idx;
      }
      return -1;
    };

    for (let turn = 1; turn <= song.skillActivations; turn++) {
      const isFever = song.feverSections.includes(turn);
      currentIndex = getNextCardIndex(currentIndex);
      if (currentIndex === -1) break; // 全除外されたら終了

      const currentCard = deck[currentIndex];
      const currentAppeal = getAppeal(currentCard);
      const currentVLevel = voltageLevel(voltagePoints) * (isFever ? 2 : 1);

      const log: any = {
        turn,
        isFever,
        card: currentCard.character,
        effects: [],
        beforeVP: voltagePoints,
        beforeScore: totalScore,
      };

      for (const effect of currentCard.skill.effects) {
        // 条件付き発動（チル, グルーヴィ, 回数条件）
        if (effect.condition) {
          const vLevel = voltageLevel(voltagePoints);
          if (
            effect.condition.type === "チル" &&
            vLevel > effect.condition.value
          ) {
            log.effects.push(`チル条件未達でスキップ`);
            continue;
          }
          if (
            effect.condition.type === "グルーヴィ" &&
            vLevel < effect.condition.value
          ) {
            log.effects.push(`グルーヴィ条件未達でスキップ`);
            continue;
          }
          if (
            effect.condition.type === "回数以下" &&
            turn > effect.condition.value
          ) {
            log.effects.push(`回数条件未達でスキップ`);
            continue;
          }
          if (
            effect.condition.type === "回数以上" &&
            turn < effect.condition.value
          ) {
            log.effects.push(`回数条件未達でスキップ`);
            continue;
          }
        }

        if (effect.type === "ボルテージゲイン") {
          const gain = effect.value * (1 + voltageBoost / 100);
          voltagePoints += gain;
          log.effects.push(`ボルテージ+${gain}`);
          voltageBoost = 0;
        } else if (effect.type === "ボルテージブースト") {
          voltageBoost += effect.value;
          log.effects.push(`ボルテージブースト+${effect.value}%`);
        } else if (effect.type === "スコアアップ") {
          const score =
            currentAppeal *
            (effect.value / 100) *
            (1 + scoreBoost / 100) *
            (1 + currentVLevel / 10) *
            (1 + song.masteryLevel / 10);
          totalScore += score;
          log.effects.push(`スコア+${Math.round(score)}`);
          scoreBoost = 0;
        } else if (effect.type === "スコアブースト") {
          scoreBoost += effect.value;
          log.effects.push(`スコアブースト+${effect.value}%`);
        } else if (effect.type === "除外") {
          const usesBeforeExclusion = effect.value ?? 1;
          const currentRemaining =
            excludeMap.get(currentIndex) ?? usesBeforeExclusion;
          const newRemaining = currentRemaining - 1;

          if (newRemaining <= 0) {
            excludeMap.set(currentIndex, 0);
            log.effects.push(`除外：このカードは以降発動しません`);
          } else {
            excludeMap.set(currentIndex, newRemaining);
            log.effects.push(`除外：あと${newRemaining}回で除外`);
          }
        } else if (effect.type === "リセット") {
          currentIndex = -1;
          log.effects.push(`リセット：次は1枚目から`);
        }
      }

      log.voltagePoints = voltagePoints;
      log.totalScore = Math.round(totalScore);
      logs.push(log);

      currentIndex = (currentIndex + 1) % deck.length;
    }

    return logs;
  }

  return { simulateDeck };
}
