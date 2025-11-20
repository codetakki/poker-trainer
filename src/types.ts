import chenFormula from "./chen-function"

export const faceCards = ['J', 'Q', 'K', 'A'] as const
export const cardNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'] as const
export const cardValues = [...cardNumbers, ...faceCards] as const
export const suit = ['heart', 'diamond', 'club', 'spade'] as const

export const deck: readonly PokerCard[] = suit.flatMap(s =>
  cardValues.map(v => ({ suit: s, value: v })),
)

export type Suit = (typeof suit)[number]
export type CardValue
  = (typeof cardValues)[number]

export type PokerCard = {
  suit: Suit
  value: CardValue
}

export type Hand = [
  PokerCard,
  PokerCard,
]
export type HandWEvaluation = {
  cards: Hand
  chenValue: ReturnType<typeof chenFormula>
}
