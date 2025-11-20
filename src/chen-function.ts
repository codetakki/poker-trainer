import type { CardValue, Hand } from './types'

function chenFormula (hand: Hand): { value: number, explanation: string } {
  const rankValues: Record<CardValue, number> = {
    A: 10,
    K: 8,
    Q: 7,
    J: 6,
    10: 5,
    9: 4.5,
    8: 4,
    7: 3.5,
    6: 3,
    5: 2.5,
    4: 2,
    3: 1.5,
    2: 1,
  }

  const [card1, card2] = hand
  const v1 = rankValues[card1.value]
  const v2 = rankValues[card2.value]

  let explanation = `Highest card value: ${Math.max(v1, v2)}.`

  // Highest card value
  let score = Math.max(v1, v2)

  // Pair bonus
  if (card1.value === card2.value) {
    score *= 2
    explanation += ` Pair, doubles to ${score}.`
    if (score < 5) {
      score = 5
      explanation += ` Minimum pair score applied: 5.`
    }
    return { value: score, explanation }
  }

  // Suited bonus
  if (card1.suit === card2.suit) {
    score += 2
    explanation += ` Cards are suited, +2 bonus.`
  }

  // Gap penalty
  const rankOrder = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
  const i1 = rankOrder.indexOf(card1.value)
  const i2 = rankOrder.indexOf(card2.value)
  const gap = Math.abs(i1 - i2) - 1

  switch (gap) {
    case 0: {
      score += 1
      explanation += ` No gap, +1 bonus.`

      break
    }
    case 1: {
      score -= 1
      explanation += ` 1 gap, -1 penalty.`

      break
    }
    case 2: {
      score -= 2
      explanation += ` 2 gap, -2 penalty.`

      break
    }
    case 3: {
      score -= 4
      explanation += ` 3 gap, -4 penalty.`

      break
    }
    default: { if (gap > 3) {
      score -= 5
      explanation += ` Gap greater than 3, -5 penalty.`
    }
    }
  }

  // Small straight bonus (A-2, 2-3, 3-4, 4-5)
  const smallStraight = (
    (card1.value === 'A' && card2.value === '2')
    || (card1.value === '2' && card2.value === '3')
    || (card1.value === '3' && card2.value === '4')
    || (card1.value === '4' && card2.value === '5')
  )
  if (smallStraight) {
    score += 1
    explanation += ` Small straight detected, +1 bonus.`
  }

  score = Math.max(score, 0)
  explanation += ` Final score: ${score}.`

  return { value: score, explanation }
}

export default chenFormula
