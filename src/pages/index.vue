<template>
  <div class="d-flex flex-wrap">

  </div>
  Chen value: {{ handValue }}
  <v-btn @click="hand = generateNewHand()">New hand</v-btn>
</template>

<script lang="ts" setup>
  import type { Hand } from '@/types'
  import { computed, ref } from 'vue'
  import chenFormula from '@/chen-function'
  import { deck } from '@/types'
  const hand = ref<Hand>(generateNewHand())

  function generateNewHand (): Hand {
    const deckCopy = [...deck]
    const firstIndex = Math.floor(Math.random() * deckCopy.length)
    const firstCard = deckCopy.splice(firstIndex, 1)[0]
    const secondIndex = Math.floor(Math.random() * deckCopy.length)
    const secondCard = deckCopy.splice(secondIndex, 1)[0]
    return [firstCard, secondCard]
  }
  const handValue = computed(() => {
    return chenFormula(hand.value)
  })
</script>
