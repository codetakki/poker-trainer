<template>
  <v-container class="d-flex align-center justify-center flex-column text-center">
    <div>
      <h1 class="text-h4">Pre Flop instinct</h1>
      <p class="text-subtitle-1">Pick the Pre Flop thats better based on <a href="https://en.wikipedia.org/wiki/Texas_hold_%27em_starting_hands#Chen_formula">Chens Formula</a></p>
    </div>
    <div class="d-flex ga-12 flex-wrap justify-center mt-8">
      <v-card
        v-for="hand in hands"
        :key="hand.toString()"
        class="d-flex"
        :color="selectedHand ? winningHand == hand ? 'success' : 'error' :'' "
        link
        width="min-content"
        @click="!selectedHand ? selectHand(hand) : ''"
      >
        <v-card-text>
          <div class="d-flex ga-2">
            <div v-for="card in hand.cards" :key="card.suit+card.value" style="height: 200px;">
              <PlayingCard v-bind="card" />
            </div>
          </div>
          <v-expand-transition>
            <div v-if="selectedHand" class="text-break mt-2 text-h6">{{ hand.chenValue.explanation }}</div>
          </v-expand-transition>
        </v-card-text>
      </v-card>
    </div>
    <v-expand-transition>
      <div v-if="selectedHand" class="mt-4 text-h5 d-flex flex-column ga-3 align-center">
        <div>
          <template v-if="pickedRightHand">
            <v-icon color="success" icon="mdi-check-circle" size="60" />
          </template>
          <template v-else>
            <v-icon color="error" icon="mdi-close-circle" size="60" />
          </template>
          <v-icon icon="mdi-timer" /> {{ (timer.timestamp.value / 1000).toFixed(1) }}s
        </div>
        <v-btn color="primary" size="x-large" @click="resetGame()">New hand</v-btn>
      </div>
    </v-expand-transition>
  </v-container>
</template>

<script lang="ts" setup>
  import type { Hand, HandWEvaluation, PokerCard } from '@/types'
  import { useTimestamp } from '@vueuse/core'
  import { computed, ref } from 'vue'
  import chenFormula from '@/chen-function'
  import { deck } from '@/types'

  const nrOfHands = ref<number>(2)
  const selectedHand = ref<HandWEvaluation | null>()
  const pickedRightHand = ref(false)

  const winningHand = ref<HandWEvaluation>()
  const hands = ref<HandWEvaluation[]>(dealNewHands(nrOfHands.value))
  let timer = useTimestamp({ controls: true, offset: Date.now() * -1 })

  function selectHand (hand: HandWEvaluation) {
    selectedHand.value = hand
    winningHand.value = (hands.value.reduce((max, hand) => {
      if (!max) return hand
      return hand.chenValue.value > max.chenValue.value ? hand : max
    }, hands.value[0],
    ))
    pickedRightHand.value = selectedHand.value == winningHand.value
    timer.pause()
  }

  function resetGame () {
    selectedHand.value = null
    pickedRightHand.value = false
    hands.value = dealNewHands(nrOfHands.value)
    timer = useTimestamp({ controls: true, offset: Date.now() * -1 })
  }

  function dealNewHands (_nrOfHands: number): HandWEvaluation[] {
    const handsArr: HandWEvaluation[] = []
    for (let i = 0; i < _nrOfHands; i++) {
      const cards = generateNewHand()
      handsArr.push({ cards, chenValue: chenFormula(cards) })
    }
    return handsArr
  }
  function generateNewHand (): Hand {
    const deckCopy = [...deck]
    const firstIndex = Math.floor(Math.random() * deckCopy.length)
    const firstCard = deckCopy.splice(firstIndex, 1)[0]
    const secondIndex = Math.floor(Math.random() * deckCopy.length)
    const secondCard = deckCopy.splice(secondIndex, 1)[0]
    return [firstCard as PokerCard, secondCard as PokerCard]
  }

</script>
